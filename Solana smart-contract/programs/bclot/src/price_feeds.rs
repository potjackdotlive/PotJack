use anchor_lang::prelude::*;
use rust_decimal::prelude::ToPrimitive;
use rust_decimal::Decimal;
use std::str::FromStr;
use switchboard_on_demand::on_demand::accounts::pull_feed::PullFeedAccountData;

use crate::RaffleError;

const LAMPORTS_PER_SOL: u64 = 1_000_000_000u64;
const TICKET_BTC_STR: &str = "0.00005";
pub const TICKET_BTC_SATOSHIS: u64 = 5_000; // 0.00005 BTC = 5,000 satoshi
const BTC_DECIMALS: u8 = 8;
const USD_DECIMALS: u8 = 6;

// Calculates the price of one ticket in lamports based on BTC and SOL price feeds
pub fn calculate_ticket_price_for_sol(
    btc_price_feed: &AccountInfo,
    sol_price_feed: &AccountInfo,
) -> Result<u64> {
    let clock = Clock::get()?;
    msg!("Current slot: {}", clock.slot);

    let sol_price = get_sol_price(sol_price_feed, clock.slot)?;
    msg!("SOL Price (Decimal): {}", sol_price);

    let btc_price = get_btc_price(btc_price_feed, clock.slot)?;
    msg!("BTC Price (Decimal): {}", btc_price);

    let ticket_price_lamports = calculate_ticket_lamports(btc_price, sol_price)?;
    
    msg!("Final ticket price (lamports): {}", ticket_price_lamports);

    Ok(ticket_price_lamports)
}

fn get_sol_price(sol_price_feed: &AccountInfo, current_slot: u64) -> Result<Decimal> {
    msg!("Parsing SOL price feed...");
    let sol_data = sol_price_feed.data.borrow();

    let sol_feed = PullFeedAccountData::parse(sol_data).map_err(|e| {
        msg!("SOL Switchboard parse failed: {:?}", e);
        RaffleError::InvalidFeedAccount
    })?;

    let sol_price = sol_feed
        .get_value(current_slot, 1500, 3, false)
        .map_err(|e| {
            msg!("SOL Switchboard get_value failed: {:?}", e);
            RaffleError::OracleError
        })?;

    Ok(sol_price)
}

fn get_btc_price(btc_price_feed: &AccountInfo, current_slot: u64) -> Result<Decimal> {
    msg!("Parsing BTC price feed...");
    let btc_data = btc_price_feed.data.borrow();

    let btc_feed = PullFeedAccountData::parse(btc_data).map_err(|e| {
        msg!("BTC Switchboard parse failed: {:?}", e);
        RaffleError::InvalidFeedAccount
    })?;

    let btc_price = btc_feed
        .get_value(current_slot, 1500, 1, false)
        .map_err(|e| {
            msg!("BTC Switchboard get_value failed: {:?}", e);
            RaffleError::OracleError
        })?;

    Ok(btc_price)
}

fn calculate_ticket_lamports(btc_price: Decimal, sol_price: Decimal) -> Result<u64> {
    let ticket_price_btc =
        Decimal::from_str(TICKET_BTC_STR).map_err(|_| ProgramError::ArithmeticOverflow)?;
    msg!("Ticket price in BTC: {}", ticket_price_btc);

    let ticket_price_usd = btc_price
        .checked_mul(ticket_price_btc)
        .ok_or(ProgramError::ArithmeticOverflow)?;
    msg!("Ticket price in USD: {}", ticket_price_usd);

    let ticket_price_sol = ticket_price_usd
        .checked_div(sol_price)
        .ok_or(ProgramError::ArithmeticOverflow)?;
    msg!("Ticket price in SOL: {}", ticket_price_sol);

    let lamports_decimal = ticket_price_sol
        .checked_mul(Decimal::from(LAMPORTS_PER_SOL))
        .ok_or(ProgramError::ArithmeticOverflow)?;
    msg!("Lamports (Decimal): {}", lamports_decimal);

    let lamports_u128 = lamports_decimal
        .round()
        .to_u128()
        .ok_or(ProgramError::ArithmeticOverflow)?;
    msg!("Lamports (rounded, u128): {}", lamports_u128);

    let lamports = u64::try_from(lamports_u128)
        .map_err(|_| ProgramError::ArithmeticOverflow)?;

    Ok(lamports)
}
