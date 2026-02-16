import{c as M,r as F,i as k,x as c,e as oe,C as j,A as D,O as H,a as N,b as L,d as ge,E as ee,R as U,f as qe,H as ni,g as K,S as bt,W as Fe,h as ce,j as vn,T as rn,k as Ve,M as ii,l as oi,m as Me,n as $i,o as $n,p as ri}from"./core-CYVvtuBp.js";import{n as u,c as P,o as A,r as x,U as ue,i as xi,t as Ci,e as Ri}from"./index-DRQ0gDTf.js";import{x as Ei,g as Ii}from"./index-BAorUSFu.js";import"./index.es-XP2IaMcN.js";const _i=M`
  :host {
    position: relative;
    background-color: ${({tokens:e})=>e.theme.foregroundTertiary};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host([data-image='true']) {
    background-color: transparent;
  }

  :host > wui-flex {
    overflow: hidden;
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host([data-size='sm']) {
    width: 32px;
    height: 32px;
  }

  :host([data-size='md']) {
    width: 40px;
    height: 40px;
  }

  :host([data-size='lg']) {
    width: 56px;
    height: 56px;
  }

  :host([name='Extension'])::after {
    border: 1px solid ${({colors:e})=>e.accent010};
  }

  :host([data-wallet-icon='allWallets'])::after {
    border: 1px solid ${({colors:e})=>e.accent010};
  }

  wui-icon[data-parent-size='inherit'] {
    width: 75%;
    height: 75%;
    align-items: center;
  }

  wui-icon[data-parent-size='sm'] {
    width: 32px;
    height: 32px;
  }

  wui-icon[data-parent-size='md'] {
    width: 40px;
    height: 40px;
  }

  :host > wui-icon-box {
    position: absolute;
    overflow: hidden;
    right: -1px;
    bottom: -2px;
    z-index: 1;
    border: 2px solid ${({tokens:e})=>e.theme.backgroundPrimary};
    padding: 1px;
  }
`;var Ie=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let de=class extends k{constructor(){super(...arguments),this.size="md",this.name="",this.installed=!1,this.badgeSize="xs"}render(){let t="1";return this.size==="lg"?t="4":this.size==="md"?t="2":this.size==="sm"&&(t="1"),this.style.cssText=`
       --local-border-radius: var(--apkt-borderRadius-${t});
   `,this.dataset.size=this.size,this.imageSrc&&(this.dataset.image="true"),this.walletIcon&&(this.dataset.walletIcon=this.walletIcon),c`
      <wui-flex justifyContent="center" alignItems="center"> ${this.templateVisual()} </wui-flex>
    `}templateVisual(){return this.imageSrc?c`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`:this.walletIcon?c`<wui-icon size="md" color="default" name=${this.walletIcon}></wui-icon>`:c`<wui-icon
      data-parent-size=${this.size}
      size="inherit"
      color="inherit"
      name="wallet"
    ></wui-icon>`}};de.styles=[F,_i];Ie([u()],de.prototype,"size",void 0);Ie([u()],de.prototype,"name",void 0);Ie([u()],de.prototype,"imageSrc",void 0);Ie([u()],de.prototype,"walletIcon",void 0);Ie([u({type:Boolean})],de.prototype,"installed",void 0);Ie([u()],de.prototype,"badgeSize",void 0);de=Ie([P("wui-wallet-image")],de);const Wi=M`
  :host {
    position: relative;
    border-radius: ${({borderRadius:e})=>e[2]};
    width: 40px;
    height: 40px;
    overflow: hidden;
    background: ${({tokens:e})=>e.theme.foregroundPrimary};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    column-gap: ${({spacing:e})=>e[1]};
    padding: ${({spacing:e})=>e[1]};
  }

  :host > wui-wallet-image {
    width: 14px;
    height: 14px;
    border-radius: 2px;
  }
`;var si=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};const Pt=4;let rt=class extends k{constructor(){super(...arguments),this.walletImages=[]}render(){const t=this.walletImages.length<Pt;return c`${this.walletImages.slice(0,Pt).map(({src:i,walletName:r})=>c`
          <wui-wallet-image
            size="sm"
            imageSrc=${i}
            name=${A(r)}
          ></wui-wallet-image>
        `)}
    ${t?[...Array(Pt-this.walletImages.length)].map(()=>c` <wui-wallet-image size="sm" name=""></wui-wallet-image>`):null} `}};rt.styles=[F,Wi];si([u({type:Array})],rt.prototype,"walletImages",void 0);rt=si([P("wui-all-wallets-image")],rt);const Si=M`
  :host {
    width: 100%;
  }

  button {
    column-gap: ${({spacing:e})=>e[2]};
    padding: ${({spacing:e})=>e[3]};
    width: 100%;
    background-color: transparent;
    border-radius: ${({borderRadius:e})=>e[4]};
    color: ${({tokens:e})=>e.theme.textPrimary};
  }

  button > wui-wallet-image {
    background: ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  button > wui-text:nth-child(2) {
    display: flex;
    flex: 1;
  }

  button:hover:enabled {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  button[data-all-wallets='true'] {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  button[data-all-wallets='true']:hover:enabled {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  button:focus-visible:enabled {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    box-shadow: 0 0 0 4px ${({tokens:e})=>e.core.foregroundAccent020};
  }

  button:disabled {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    opacity: 0.5;
    cursor: not-allowed;
  }

  button:disabled > wui-tag {
    background-color: ${({tokens:e})=>e.core.glass010};
    color: ${({tokens:e})=>e.theme.foregroundTertiary};
  }
`;var J=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let V=class extends k{constructor(){super(...arguments),this.walletImages=[],this.imageSrc="",this.name="",this.size="md",this.tabIdx=void 0,this.disabled=!1,this.showAllWallets=!1,this.loading=!1,this.loadingSpinnerColor="accent-100"}render(){return this.dataset.size=this.size,c`
      <button
        ?disabled=${this.disabled}
        data-all-wallets=${this.showAllWallets}
        tabindex=${A(this.tabIdx)}
      >
        ${this.templateAllWallets()} ${this.templateWalletImage()}
        <wui-text variant="lg-regular" color="inherit">${this.name}</wui-text>
        ${this.templateStatus()}
      </button>
    `}templateAllWallets(){return this.showAllWallets&&this.imageSrc?c` <wui-all-wallets-image .imageeSrc=${this.imageSrc}> </wui-all-wallets-image> `:this.showAllWallets&&this.walletIcon?c` <wui-wallet-image .walletIcon=${this.walletIcon} size="sm"> </wui-wallet-image> `:null}templateWalletImage(){return!this.showAllWallets&&this.imageSrc?c`<wui-wallet-image
        size=${A(this.size==="sm"?"sm":"md")}
        imageSrc=${this.imageSrc}
        name=${this.name}
      ></wui-wallet-image>`:!this.showAllWallets&&!this.imageSrc?c`<wui-wallet-image size="sm" name=${this.name}></wui-wallet-image>`:null}templateStatus(){return this.loading?c`<wui-loading-spinner size="lg" color="accent-primary"></wui-loading-spinner>`:this.tagLabel&&this.tagVariant?c`<wui-tag size="sm" variant=${this.tagVariant}>${this.tagLabel}</wui-tag>`:null}};V.styles=[F,oe,Si];J([u({type:Array})],V.prototype,"walletImages",void 0);J([u()],V.prototype,"imageSrc",void 0);J([u()],V.prototype,"name",void 0);J([u()],V.prototype,"size",void 0);J([u()],V.prototype,"tagLabel",void 0);J([u()],V.prototype,"tagVariant",void 0);J([u()],V.prototype,"walletIcon",void 0);J([u()],V.prototype,"tabIdx",void 0);J([u({type:Boolean})],V.prototype,"disabled",void 0);J([u({type:Boolean})],V.prototype,"showAllWallets",void 0);J([u({type:Boolean})],V.prototype,"loading",void 0);J([u({type:String})],V.prototype,"loadingSpinnerColor",void 0);V=J([P("wui-list-wallet")],V);var Oe=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let be=class extends k{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=j.state.connectors,this.count=D.state.count,this.filteredCount=D.state.filteredWallets.length,this.isFetchingRecommendedWallets=D.state.isFetchingRecommendedWallets,this.unsubscribe.push(j.subscribeKey("connectors",t=>this.connectors=t),D.subscribeKey("count",t=>this.count=t),D.subscribeKey("filteredWallets",t=>this.filteredCount=t.length),D.subscribeKey("isFetchingRecommendedWallets",t=>this.isFetchingRecommendedWallets=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){const t=this.connectors.find(d=>d.id==="walletConnect"),{allWallets:i}=H.state;if(!t||i==="HIDE"||i==="ONLY_MOBILE"&&!N.isMobile())return null;const r=D.state.featured.length,o=this.count+r,n=o<10?o:Math.floor(o/10)*10,s=this.filteredCount>0?this.filteredCount:n;let a=`${s}`;this.filteredCount>0?a=`${this.filteredCount}`:s<o&&(a=`${s}+`);const l=L.hasAnyConnection(ge.CONNECTOR_ID.WALLET_CONNECT);return c`
      <wui-list-wallet
        name="Search Wallet"
        walletIcon="search"
        showAllWallets
        @click=${this.onAllWallets.bind(this)}
        tagLabel=${a}
        tagVariant="info"
        data-testid="all-wallets"
        tabIdx=${A(this.tabIdx)}
        .loading=${this.isFetchingRecommendedWallets}
        ?disabled=${l}
        size="sm"
      ></wui-list-wallet>
    `}onAllWallets(){ee.sendEvent({type:"track",event:"CLICK_ALL_WALLETS"}),U.push("AllWallets")}};Oe([u()],be.prototype,"tabIdx",void 0);Oe([x()],be.prototype,"connectors",void 0);Oe([x()],be.prototype,"count",void 0);Oe([x()],be.prototype,"filteredCount",void 0);Oe([x()],be.prototype,"isFetchingRecommendedWallets",void 0);be=Oe([P("w3m-all-wallets-widget")],be);var yt=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let He=class extends k{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=j.state.connectors,this.connections=L.state.connections,this.unsubscribe.push(j.subscribeKey("connectors",t=>this.connectors=t),L.subscribeKey("connections",t=>this.connections=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){const t=this.connectors.filter(i=>i.type==="ANNOUNCED");return t?.length?c`
      <wui-flex flexDirection="column" gap="2">
        ${t.filter(qe.showConnector).map(i=>{const o=(this.connections.get(i.chain)??[]).some(n=>ni.isLowerCaseMatch(n.connectorId,i.id));return c`
            <wui-list-wallet
              imageSrc=${A(K.getConnectorImage(i))}
              name=${i.name??"Unknown"}
              @click=${()=>this.onConnector(i)}
              tagVariant=${o?"info":"success"}
              tagLabel=${o?"connected":"installed"}
              size="sm"
              data-testid=${`wallet-selector-${i.id}`}
              .installed=${!0}
              tabIdx=${A(this.tabIdx)}
            >
            </wui-list-wallet>
          `})}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(t){t.id==="walletConnect"?N.isMobile()?U.push("AllWallets"):U.push("ConnectingWalletConnect"):U.push("ConnectingExternal",{connector:t})}};yt([u()],He.prototype,"tabIdx",void 0);yt([x()],He.prototype,"connectors",void 0);yt([x()],He.prototype,"connections",void 0);He=yt([P("w3m-connect-announced-widget")],He);var vt=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let Ke=class extends k{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=j.state.connectors,this.loading=!1,this.unsubscribe.push(j.subscribeKey("connectors",t=>this.connectors=t)),N.isTelegram()&&N.isIos()&&(this.loading=!L.state.wcUri,this.unsubscribe.push(L.subscribeKey("wcUri",t=>this.loading=!t)))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){const{customWallets:t}=H.state;if(!t?.length)return this.style.cssText="display: none",null;const i=this.filterOutDuplicateWallets(t),r=L.hasAnyConnection(ge.CONNECTOR_ID.WALLET_CONNECT);return c`<wui-flex flexDirection="column" gap="2">
      ${i.map(o=>c`
          <wui-list-wallet
            imageSrc=${A(K.getWalletImage(o))}
            name=${o.name??"Unknown"}
            @click=${()=>this.onConnectWallet(o)}
            size="sm"
            data-testid=${`wallet-selector-${o.id}`}
            tabIdx=${A(this.tabIdx)}
            ?loading=${this.loading}
            ?disabled=${r}
          >
          </wui-list-wallet>
        `)}
    </wui-flex>`}filterOutDuplicateWallets(t){const i=bt.getRecentWallets(),r=this.connectors.map(a=>a.info?.rdns).filter(Boolean),o=i.map(a=>a.rdns).filter(Boolean),n=r.concat(o);if(n.includes("io.metamask.mobile")&&N.isMobile()){const a=n.indexOf("io.metamask.mobile");n[a]="io.metamask"}return t.filter(a=>!n.includes(String(a?.rdns)))}onConnectWallet(t){this.loading||U.push("ConnectingWalletConnect",{wallet:t})}};vt([u()],Ke.prototype,"tabIdx",void 0);vt([x()],Ke.prototype,"connectors",void 0);vt([x()],Ke.prototype,"loading",void 0);Ke=vt([P("w3m-connect-custom-widget")],Ke);var ln=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let st=class extends k{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=j.state.connectors,this.unsubscribe.push(j.subscribeKey("connectors",t=>this.connectors=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){const r=this.connectors.filter(n=>n.type==="EXTERNAL").filter(qe.showConnector).filter(n=>n.id!==ge.CONNECTOR_ID.COINBASE_SDK);if(!r?.length)return this.style.cssText="display: none",null;const o=L.hasAnyConnection(ge.CONNECTOR_ID.WALLET_CONNECT);return c`
      <wui-flex flexDirection="column" gap="2">
        ${r.map(n=>c`
            <wui-list-wallet
              imageSrc=${A(K.getConnectorImage(n))}
              .installed=${!0}
              name=${n.name??"Unknown"}
              data-testid=${`wallet-selector-external-${n.id}`}
              size="sm"
              @click=${()=>this.onConnector(n)}
              tabIdx=${A(this.tabIdx)}
              ?disabled=${o}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `}onConnector(t){U.push("ConnectingExternal",{connector:t})}};ln([u()],st.prototype,"tabIdx",void 0);ln([x()],st.prototype,"connectors",void 0);st=ln([P("w3m-connect-external-widget")],st);var cn=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let at=class extends k{constructor(){super(...arguments),this.tabIdx=void 0,this.wallets=[]}render(){if(!this.wallets.length)return this.style.cssText="display: none",null;const t=L.hasAnyConnection(ge.CONNECTOR_ID.WALLET_CONNECT);return c`
      <wui-flex flexDirection="column" gap="2">
        ${this.wallets.map(i=>c`
            <wui-list-wallet
              data-testid=${`wallet-selector-featured-${i.id}`}
              imageSrc=${A(K.getWalletImage(i))}
              name=${i.name??"Unknown"}
              @click=${()=>this.onConnectWallet(i)}
              tabIdx=${A(this.tabIdx)}
              size="sm"
              ?disabled=${t}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `}onConnectWallet(t){j.selectWalletConnector(t)}};cn([u()],at.prototype,"tabIdx",void 0);cn([u()],at.prototype,"wallets",void 0);at=cn([P("w3m-connect-featured-widget")],at);var $t=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let Ge=class extends k{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=[],this.connections=L.state.connections,this.unsubscribe.push(L.subscribeKey("connections",t=>this.connections=t))}render(){const t=this.connectors.filter(qe.showConnector);return t.length===0?(this.style.cssText="display: none",null):c`
      <wui-flex flexDirection="column" gap="2">
        ${t.map(i=>{const o=(this.connections.get(i.chain)??[]).some(n=>ni.isLowerCaseMatch(n.connectorId,i.id));return c`
            <wui-list-wallet
              imageSrc=${A(K.getConnectorImage(i))}
              .installed=${!0}
              name=${i.name??"Unknown"}
              tagVariant=${o?"info":"success"}
              tagLabel=${o?"connected":"installed"}
              data-testid=${`wallet-selector-${i.id}`}
              size="sm"
              @click=${()=>this.onConnector(i)}
              tabIdx=${A(this.tabIdx)}
            >
            </wui-list-wallet>
          `})}
      </wui-flex>
    `}onConnector(t){j.setActiveConnector(t),U.push("ConnectingExternal",{connector:t})}};$t([u()],Ge.prototype,"tabIdx",void 0);$t([u()],Ge.prototype,"connectors",void 0);$t([x()],Ge.prototype,"connections",void 0);Ge=$t([P("w3m-connect-injected-widget")],Ge);var un=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let lt=class extends k{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=j.state.connectors,this.unsubscribe.push(j.subscribeKey("connectors",t=>this.connectors=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){const t=this.connectors.filter(i=>i.type==="MULTI_CHAIN"&&i.name!=="WalletConnect");return t?.length?c`
      <wui-flex flexDirection="column" gap="2">
        ${t.map(i=>c`
            <wui-list-wallet
              imageSrc=${A(K.getConnectorImage(i))}
              .installed=${!0}
              name=${i.name??"Unknown"}
              tagVariant="info"
              tagLabel="multichain"
              data-testid=${`wallet-selector-${i.id}`}
              size="sm"
              @click=${()=>this.onConnector(i)}
              tabIdx=${A(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(t){j.setActiveConnector(t),U.push("ConnectingMultiChain")}};un([u()],lt.prototype,"tabIdx",void 0);un([x()],lt.prototype,"connectors",void 0);lt=un([P("w3m-connect-multi-chain-widget")],lt);var xt=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let Ye=class extends k{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=j.state.connectors,this.loading=!1,this.unsubscribe.push(j.subscribeKey("connectors",t=>this.connectors=t)),N.isTelegram()&&N.isIos()&&(this.loading=!L.state.wcUri,this.unsubscribe.push(L.subscribeKey("wcUri",t=>this.loading=!t)))}render(){const i=bt.getRecentWallets().filter(o=>!Fe.isExcluded(o)).filter(o=>!this.hasWalletConnector(o)).filter(o=>this.isWalletCompatibleWithCurrentChain(o));if(!i.length)return this.style.cssText="display: none",null;const r=L.hasAnyConnection(ge.CONNECTOR_ID.WALLET_CONNECT);return c`
      <wui-flex flexDirection="column" gap="2">
        ${i.map(o=>c`
            <wui-list-wallet
              imageSrc=${A(K.getWalletImage(o))}
              name=${o.name??"Unknown"}
              @click=${()=>this.onConnectWallet(o)}
              tagLabel="recent"
              tagVariant="info"
              size="sm"
              tabIdx=${A(this.tabIdx)}
              ?loading=${this.loading}
              ?disabled=${r}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `}onConnectWallet(t){this.loading||j.selectWalletConnector(t)}hasWalletConnector(t){return this.connectors.some(i=>i.id===t.id||i.name===t.name)}isWalletCompatibleWithCurrentChain(t){const i=ce.state.activeChain;return i&&t.chains?t.chains.some(r=>{const o=r.split(":")[0];return i===o}):!0}};xt([u()],Ye.prototype,"tabIdx",void 0);xt([x()],Ye.prototype,"connectors",void 0);xt([x()],Ye.prototype,"loading",void 0);Ye=xt([P("w3m-connect-recent-widget")],Ye);var Ct=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let Je=class extends k{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.wallets=[],this.loading=!1,N.isTelegram()&&N.isIos()&&(this.loading=!L.state.wcUri,this.unsubscribe.push(L.subscribeKey("wcUri",t=>this.loading=!t)))}render(){const{connectors:t}=j.state,{customWallets:i,featuredWalletIds:r}=H.state,o=bt.getRecentWallets(),n=t.find(f=>f.id==="walletConnect"),a=t.filter(f=>f.type==="INJECTED"||f.type==="ANNOUNCED"||f.type==="MULTI_CHAIN").filter(f=>f.name!=="Browser Wallet");if(!n)return null;if(r||i||!this.wallets.length)return this.style.cssText="display: none",null;const l=a.length+o.length,d=Math.max(0,2-l),g=Fe.filterOutDuplicateWallets(this.wallets).slice(0,d);if(!g.length)return this.style.cssText="display: none",null;const E=L.hasAnyConnection(ge.CONNECTOR_ID.WALLET_CONNECT);return c`
      <wui-flex flexDirection="column" gap="2">
        ${g.map(f=>c`
            <wui-list-wallet
              imageSrc=${A(K.getWalletImage(f))}
              name=${f?.name??"Unknown"}
              @click=${()=>this.onConnectWallet(f)}
              size="sm"
              tabIdx=${A(this.tabIdx)}
              ?loading=${this.loading}
              ?disabled=${E}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `}onConnectWallet(t){if(this.loading)return;const i=j.getConnector({id:t.id,rdns:t.rdns});i?U.push("ConnectingExternal",{connector:i}):U.push("ConnectingWalletConnect",{wallet:t})}};Ct([u()],Je.prototype,"tabIdx",void 0);Ct([u()],Je.prototype,"wallets",void 0);Ct([x()],Je.prototype,"loading",void 0);Je=Ct([P("w3m-connect-recommended-widget")],Je);var Rt=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let Qe=class extends k{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=j.state.connectors,this.connectorImages=vn.state.connectorImages,this.unsubscribe.push(j.subscribeKey("connectors",t=>this.connectors=t),vn.subscribeKey("connectorImages",t=>this.connectorImages=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){if(N.isMobile())return this.style.cssText="display: none",null;const t=this.connectors.find(o=>o.id==="walletConnect");if(!t)return this.style.cssText="display: none",null;const i=t.imageUrl||this.connectorImages[t?.imageId??""],r=L.hasAnyConnection(ge.CONNECTOR_ID.WALLET_CONNECT);return c`
      <wui-list-wallet
        imageSrc=${A(i)}
        name=${t.name??"Unknown"}
        @click=${()=>this.onConnector(t)}
        tagLabel="qr code"
        tagVariant="accent"
        tabIdx=${A(this.tabIdx)}
        data-testid="wallet-selector-walletconnect"
        size="sm"
        ?disabled=${r}
      >
      </wui-list-wallet>
    `}onConnector(t){j.setActiveConnector(t),U.push("ConnectingWalletConnect")}};Rt([u()],Qe.prototype,"tabIdx",void 0);Rt([x()],Qe.prototype,"connectors",void 0);Rt([x()],Qe.prototype,"connectorImages",void 0);Qe=Rt([P("w3m-connect-walletconnect-widget")],Qe);const Ti=M`
  :host {
    margin-top: ${({spacing:e})=>e[1]};
  }
  wui-separator {
    margin: ${({spacing:e})=>e[3]} calc(${({spacing:e})=>e[3]} * -1)
      ${({spacing:e})=>e[2]} calc(${({spacing:e})=>e[3]} * -1);
    width: calc(100% + ${({spacing:e})=>e[3]} * 2);
  }
`;var Xe=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let ye=class extends k{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=j.state.connectors,this.recommended=D.state.recommended,this.featured=D.state.featured,this.unsubscribe.push(j.subscribeKey("connectors",t=>this.connectors=t),D.subscribeKey("recommended",t=>this.recommended=t),D.subscribeKey("featured",t=>this.featured=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){return c`
      <wui-flex flexDirection="column" gap="2"> ${this.connectorListTemplate()} </wui-flex>
    `}connectorListTemplate(){const{custom:t,recent:i,announced:r,injected:o,multiChain:n,recommended:s,featured:a,external:l}=qe.getConnectorsByType(this.connectors,this.recommended,this.featured);return qe.getConnectorTypeOrder({custom:t,recent:i,announced:r,injected:o,multiChain:n,recommended:s,featured:a,external:l}).map(g=>{switch(g){case"injected":return c`
            ${n.length?c`<w3m-connect-multi-chain-widget
                  tabIdx=${A(this.tabIdx)}
                ></w3m-connect-multi-chain-widget>`:null}
            ${r.length?c`<w3m-connect-announced-widget
                  tabIdx=${A(this.tabIdx)}
                ></w3m-connect-announced-widget>`:null}
            ${o.length?c`<w3m-connect-injected-widget
                  .connectors=${o}
                  tabIdx=${A(this.tabIdx)}
                ></w3m-connect-injected-widget>`:null}
          `;case"walletConnect":return c`<w3m-connect-walletconnect-widget
            tabIdx=${A(this.tabIdx)}
          ></w3m-connect-walletconnect-widget>`;case"recent":return c`<w3m-connect-recent-widget
            tabIdx=${A(this.tabIdx)}
          ></w3m-connect-recent-widget>`;case"featured":return c`<w3m-connect-featured-widget
            .wallets=${a}
            tabIdx=${A(this.tabIdx)}
          ></w3m-connect-featured-widget>`;case"custom":return c`<w3m-connect-custom-widget
            tabIdx=${A(this.tabIdx)}
          ></w3m-connect-custom-widget>`;case"external":return c`<w3m-connect-external-widget
            tabIdx=${A(this.tabIdx)}
          ></w3m-connect-external-widget>`;case"recommended":return c`<w3m-connect-recommended-widget
            .wallets=${s}
            tabIdx=${A(this.tabIdx)}
          ></w3m-connect-recommended-widget>`;default:return console.warn(`Unknown connector type: ${g}`),null}})}};ye.styles=Ti;Xe([u()],ye.prototype,"tabIdx",void 0);Xe([x()],ye.prototype,"connectors",void 0);Xe([x()],ye.prototype,"recommended",void 0);Xe([x()],ye.prototype,"featured",void 0);ye=Xe([P("w3m-connector-list")],ye);const Ai=M`
  :host {
    flex: 1;
    height: 100%;
  }

  button {
    width: 100%;
    height: 100%;
    display: inline-flex;
    align-items: center;
    padding: ${({spacing:e})=>e[1]} ${({spacing:e})=>e[2]};
    column-gap: ${({spacing:e})=>e[1]};
    color: ${({tokens:e})=>e.theme.textSecondary};
    border-radius: ${({borderRadius:e})=>e[20]};
    background-color: transparent;
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color;
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  button[data-active='true'] {
    color: ${({tokens:e})=>e.theme.textPrimary};
    background-color: ${({tokens:e})=>e.theme.foregroundTertiary};
  }

  button:hover:enabled:not([data-active='true']),
  button:active:enabled:not([data-active='true']) {
    wui-text,
    wui-icon {
      color: ${({tokens:e})=>e.theme.textPrimary};
    }
  }
`;var Ze=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};const Pi={lg:"lg-regular",md:"md-regular",sm:"sm-regular"},Bi={lg:"md",md:"sm",sm:"sm"};let ve=class extends k{constructor(){super(...arguments),this.icon="mobile",this.size="md",this.label="",this.active=!1}render(){return c`
      <button data-active=${this.active}>
        ${this.icon?c`<wui-icon size=${Bi[this.size]} name=${this.icon}></wui-icon>`:""}
        <wui-text variant=${Pi[this.size]}> ${this.label} </wui-text>
      </button>
    `}};ve.styles=[F,oe,Ai];Ze([u()],ve.prototype,"icon",void 0);Ze([u()],ve.prototype,"size",void 0);Ze([u()],ve.prototype,"label",void 0);Ze([u({type:Boolean})],ve.prototype,"active",void 0);ve=Ze([P("wui-tab-item")],ve);const Li=M`
  :host {
    display: inline-flex;
    align-items: center;
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    border-radius: ${({borderRadius:e})=>e[32]};
    padding: ${({spacing:e})=>e["01"]};
    box-sizing: border-box;
  }

  :host([data-size='sm']) {
    height: 26px;
  }

  :host([data-size='md']) {
    height: 36px;
  }
`;var et=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let $e=class extends k{constructor(){super(...arguments),this.tabs=[],this.onTabChange=()=>null,this.size="md",this.activeTab=0}render(){return this.dataset.size=this.size,this.tabs.map((t,i)=>{const r=i===this.activeTab;return c`
        <wui-tab-item
          @click=${()=>this.onTabClick(i)}
          icon=${t.icon}
          size=${this.size}
          label=${t.label}
          ?active=${r}
          data-active=${r}
          data-testid="tab-${t.label?.toLowerCase()}"
        ></wui-tab-item>
      `})}onTabClick(t){this.activeTab=t,this.onTabChange(t)}};$e.styles=[F,oe,Li];et([u({type:Array})],$e.prototype,"tabs",void 0);et([u()],$e.prototype,"onTabChange",void 0);et([u()],$e.prototype,"size",void 0);et([x()],$e.prototype,"activeTab",void 0);$e=et([P("wui-tabs")],$e);var dn=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let ct=class extends k{constructor(){super(...arguments),this.platformTabs=[],this.unsubscribe=[],this.platforms=[],this.onSelectPlatfrom=void 0}disconnectCallback(){this.unsubscribe.forEach(t=>t())}render(){const t=this.generateTabs();return c`
      <wui-flex justifyContent="center" .padding=${["0","0","4","0"]}>
        <wui-tabs .tabs=${t} .onTabChange=${this.onTabChange.bind(this)}></wui-tabs>
      </wui-flex>
    `}generateTabs(){const t=this.platforms.map(i=>i==="browser"?{label:"Browser",icon:"extension",platform:"browser"}:i==="mobile"?{label:"Mobile",icon:"mobile",platform:"mobile"}:i==="qrcode"?{label:"Mobile",icon:"mobile",platform:"qrcode"}:i==="web"?{label:"Webapp",icon:"browser",platform:"web"}:i==="desktop"?{label:"Desktop",icon:"desktop",platform:"desktop"}:{label:"Browser",icon:"extension",platform:"unsupported"});return this.platformTabs=t.map(({platform:i})=>i),t}onTabChange(t){const i=this.platformTabs[t];i&&this.onSelectPlatfrom?.(i)}};dn([u({type:Array})],ct.prototype,"platforms",void 0);dn([u()],ct.prototype,"onSelectPlatfrom",void 0);ct=dn([P("w3m-connecting-header")],ct);const Oi=M`
  :host {
    width: var(--local-width);
  }

  button {
    width: var(--local-width);
    white-space: nowrap;
    column-gap: ${({spacing:e})=>e[2]};
    transition:
      scale ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-1"]},
      background-color ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      border-radius ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-1"]};
    will-change: scale, background-color, border-radius;
    cursor: pointer;
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='sm'] {
    border-radius: ${({borderRadius:e})=>e[2]};
    padding: 0 ${({spacing:e})=>e[2]};
    height: 28px;
  }

  button[data-size='md'] {
    border-radius: ${({borderRadius:e})=>e[3]};
    padding: 0 ${({spacing:e})=>e[4]};
    height: 38px;
  }

  button[data-size='lg'] {
    border-radius: ${({borderRadius:e})=>e[4]};
    padding: 0 ${({spacing:e})=>e[5]};
    height: 48px;
  }

  /* -- Variants --------------------------------------------------------- */
  button[data-variant='accent-primary'] {
    background-color: ${({tokens:e})=>e.core.backgroundAccentPrimary};
    color: ${({tokens:e})=>e.theme.textInvert};
  }

  button[data-variant='accent-secondary'] {
    background-color: ${({tokens:e})=>e.core.foregroundAccent010};
    color: ${({tokens:e})=>e.core.textAccentPrimary};
  }

  button[data-variant='neutral-primary'] {
    background-color: ${({tokens:e})=>e.theme.backgroundInvert};
    color: ${({tokens:e})=>e.theme.textInvert};
  }

  button[data-variant='neutral-secondary'] {
    background-color: transparent;
    border: 1px solid ${({tokens:e})=>e.theme.borderSecondary};
    color: ${({tokens:e})=>e.theme.textPrimary};
  }

  button[data-variant='neutral-tertiary'] {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    color: ${({tokens:e})=>e.theme.textPrimary};
  }

  button[data-variant='error-primary'] {
    background-color: ${({tokens:e})=>e.core.textError};
    color: ${({tokens:e})=>e.theme.textInvert};
  }

  button[data-variant='error-secondary'] {
    background-color: ${({tokens:e})=>e.core.backgroundError};
    color: ${({tokens:e})=>e.core.textError};
  }

  button[data-variant='shade'] {
    background: var(--wui-color-gray-glass-002);
    color: var(--wui-color-fg-200);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  /* -- Focus states --------------------------------------------------- */
  button[data-size='sm']:focus-visible:enabled {
    border-radius: 28px;
  }

  button[data-size='md']:focus-visible:enabled {
    border-radius: 38px;
  }

  button[data-size='lg']:focus-visible:enabled {
    border-radius: 48px;
  }
  button[data-variant='shade']:focus-visible:enabled {
    background: var(--wui-color-gray-glass-005);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-gray-glass-010),
      0 0 0 4px var(--wui-color-gray-glass-002);
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  @media (hover: hover) {
    button[data-size='sm']:hover:enabled {
      border-radius: 28px;
    }

    button[data-size='md']:hover:enabled {
      border-radius: 38px;
    }

    button[data-size='lg']:hover:enabled {
      border-radius: 48px;
    }

    button[data-variant='shade']:hover:enabled {
      background: var(--wui-color-gray-glass-002);
    }

    button[data-variant='shade']:active:enabled {
      background: var(--wui-color-gray-glass-005);
    }
  }

  button[data-size='sm']:active:enabled {
    border-radius: 28px;
  }

  button[data-size='md']:active:enabled {
    border-radius: 38px;
  }

  button[data-size='lg']:active:enabled {
    border-radius: 48px;
  }

  /* -- Disabled states --------------------------------------------------- */
  button:disabled {
    opacity: 0.3;
  }
`;var _e=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};const Ni={lg:"lg-regular-mono",md:"md-regular-mono",sm:"sm-regular-mono"},ki={lg:"md",md:"md",sm:"sm"};let he=class extends k{constructor(){super(...arguments),this.size="lg",this.disabled=!1,this.fullWidth=!1,this.loading=!1,this.variant="accent-primary"}render(){this.style.cssText=`
    --local-width: ${this.fullWidth?"100%":"auto"};
     `;const t=this.textVariant??Ni[this.size];return c`
      <button data-variant=${this.variant} data-size=${this.size} ?disabled=${this.disabled}>
        ${this.loadingTemplate()}
        <slot name="iconLeft"></slot>
        <wui-text variant=${t} color="inherit">
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `}loadingTemplate(){if(this.loading){const t=ki[this.size],i=this.variant==="neutral-primary"||this.variant==="accent-primary"?"invert":"primary";return c`<wui-loading-spinner color=${i} size=${t}></wui-loading-spinner>`}return null}};he.styles=[F,oe,Oi];_e([u()],he.prototype,"size",void 0);_e([u({type:Boolean})],he.prototype,"disabled",void 0);_e([u({type:Boolean})],he.prototype,"fullWidth",void 0);_e([u({type:Boolean})],he.prototype,"loading",void 0);_e([u()],he.prototype,"variant",void 0);_e([u()],he.prototype,"textVariant",void 0);he=_e([P("wui-button")],he);const zi=M`
  :host {
    display: block;
    width: 100px;
    height: 100px;
  }

  svg {
    width: 100px;
    height: 100px;
  }

  rect {
    fill: none;
    stroke: ${e=>e.colors.accent100};
    stroke-width: 3px;
    stroke-linecap: round;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`;var ai=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let ut=class extends k{constructor(){super(...arguments),this.radius=36}render(){return this.svgLoaderTemplate()}svgLoaderTemplate(){const t=this.radius>50?50:this.radius,r=36-t,o=116+r,n=245+r,s=360+r*1.75;return c`
      <svg viewBox="0 0 110 110" width="110" height="110">
        <rect
          x="2"
          y="2"
          width="106"
          height="106"
          rx=${t}
          stroke-dasharray="${o} ${n}"
          stroke-dashoffset=${s}
        />
      </svg>
    `}};ut.styles=[F,zi];ai([u({type:Number})],ut.prototype,"radius",void 0);ut=ai([P("wui-loading-thumbnail")],ut);const Di=M`
  wui-flex {
    width: 100%;
    height: 52px;
    box-sizing: border-box;
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: ${({borderRadius:e})=>e[5]};
    padding-left: ${({spacing:e})=>e[3]};
    padding-right: ${({spacing:e})=>e[3]};
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${({spacing:e})=>e[6]};
  }

  wui-text {
    color: ${({tokens:e})=>e.theme.textSecondary};
  }

  wui-icon {
    width: 12px;
    height: 12px;
  }
`;var Et=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let Pe=class extends k{constructor(){super(...arguments),this.disabled=!1,this.label="",this.buttonLabel=""}render(){return c`
      <wui-flex justifyContent="space-between" alignItems="center">
        <wui-text variant="lg-regular" color="inherit">${this.label}</wui-text>
        <wui-button variant="accent-secondary" size="sm">
          ${this.buttonLabel}
          <wui-icon name="chevronRight" color="inherit" size="inherit" slot="iconRight"></wui-icon>
        </wui-button>
      </wui-flex>
    `}};Pe.styles=[F,oe,Di];Et([u({type:Boolean})],Pe.prototype,"disabled",void 0);Et([u()],Pe.prototype,"label",void 0);Et([u()],Pe.prototype,"buttonLabel",void 0);Pe=Et([P("wui-cta-button")],Pe);const ji=M`
  :host {
    display: block;
    padding: 0 ${({spacing:e})=>e[5]} ${({spacing:e})=>e[5]};
  }
`;var li=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let dt=class extends k{constructor(){super(...arguments),this.wallet=void 0}render(){if(!this.wallet)return this.style.display="none",null;const{name:t,app_store:i,play_store:r,chrome_store:o,homepage:n}=this.wallet,s=N.isMobile(),a=N.isIos(),l=N.isAndroid(),d=[i,r,n,o].filter(Boolean).length>1,g=ue.getTruncateString({string:t,charsStart:12,charsEnd:0,truncate:"end"});return d&&!s?c`
        <wui-cta-button
          label=${`Don't have ${g}?`}
          buttonLabel="Get"
          @click=${()=>U.push("Downloads",{wallet:this.wallet})}
        ></wui-cta-button>
      `:!d&&n?c`
        <wui-cta-button
          label=${`Don't have ${g}?`}
          buttonLabel="Get"
          @click=${this.onHomePage.bind(this)}
        ></wui-cta-button>
      `:i&&a?c`
        <wui-cta-button
          label=${`Don't have ${g}?`}
          buttonLabel="Get"
          @click=${this.onAppStore.bind(this)}
        ></wui-cta-button>
      `:r&&l?c`
        <wui-cta-button
          label=${`Don't have ${g}?`}
          buttonLabel="Get"
          @click=${this.onPlayStore.bind(this)}
        ></wui-cta-button>
      `:(this.style.display="none",null)}onAppStore(){this.wallet?.app_store&&N.openHref(this.wallet.app_store,"_blank")}onPlayStore(){this.wallet?.play_store&&N.openHref(this.wallet.play_store,"_blank")}onHomePage(){this.wallet?.homepage&&N.openHref(this.wallet.homepage,"_blank")}};dt.styles=[ji];li([u({type:Object})],dt.prototype,"wallet",void 0);dt=li([P("w3m-mobile-download-links")],dt);const Mi=M`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-wallet-image {
    width: 56px;
    height: 56px;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: calc(${({spacing:e})=>e[1]} * -1);
    bottom: calc(${({spacing:e})=>e[1]} * -1);
    opacity: 0;
    transform: scale(0.5);
    transition-property: opacity, transform;
    transition-duration: ${({durations:e})=>e.lg};
    transition-timing-function: ${({easings:e})=>e["ease-out-power-2"]};
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px ${({spacing:e})=>e[4]};
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms ${({easings:e})=>e["ease-out-power-2"]} both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }

  w3m-mobile-download-links {
    padding: 0px;
    width: 100%;
  }
`;var te=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};class q extends k{constructor(){super(),this.wallet=U.state.data?.wallet,this.connector=U.state.data?.connector,this.timeout=void 0,this.secondaryBtnIcon="refresh",this.onConnect=void 0,this.onRender=void 0,this.onAutoConnect=void 0,this.isWalletConnect=!0,this.unsubscribe=[],this.imageSrc=K.getWalletImage(this.wallet)??K.getConnectorImage(this.connector),this.name=this.wallet?.name??this.connector?.name??"Wallet",this.isRetrying=!1,this.uri=L.state.wcUri,this.error=L.state.wcError,this.ready=!1,this.showRetry=!1,this.label=void 0,this.secondaryBtnLabel="Try again",this.secondaryLabel="Accept connection request in the wallet",this.isLoading=!1,this.isMobile=!1,this.onRetry=void 0,this.unsubscribe.push(L.subscribeKey("wcUri",t=>{this.uri=t,this.isRetrying&&this.onRetry&&(this.isRetrying=!1,this.onConnect?.())}),L.subscribeKey("wcError",t=>this.error=t)),(N.isTelegram()||N.isSafari())&&N.isIos()&&L.state.wcUri&&this.onConnect?.()}firstUpdated(){this.onAutoConnect?.(),this.showRetry=!this.onAutoConnect}disconnectedCallback(){this.unsubscribe.forEach(t=>t()),L.setWcError(!1),clearTimeout(this.timeout)}render(){this.onRender?.(),this.onShowRetry();const t=this.error?"Connection can be declined if a previous request is still active":this.secondaryLabel;let i="";return this.label?i=this.label:(i=`Continue in ${this.name}`,this.error&&(i="Connection declined")),c`
      <wui-flex
        data-error=${A(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${["10","5","5","5"]}
        gap="6"
      >
        <wui-flex gap="2" justifyContent="center" alignItems="center">
          <wui-wallet-image size="lg" imageSrc=${A(this.imageSrc)}></wui-wallet-image>

          ${this.error?null:this.loaderTemplate()}

          <wui-icon-box
            color="error"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="6"> <wui-flex
          flexDirection="column"
          alignItems="center"
          gap="2"
          .padding=${["2","0","0","0"]}
        >
          <wui-text align="center" variant="lg-medium" color=${this.error?"error":"primary"}>
            ${i}
          </wui-text>
          <wui-text align="center" variant="lg-regular" color="secondary">${t}</wui-text>
        </wui-flex>

        ${this.secondaryBtnLabel?c`
                <wui-button
                  variant="neutral-secondary"
                  size="md"
                  ?disabled=${this.isRetrying||this.isLoading}
                  @click=${this.onTryAgain.bind(this)}
                  data-testid="w3m-connecting-widget-secondary-button"
                >
                  <wui-icon
                    color="inherit"
                    slot="iconLeft"
                    name=${this.secondaryBtnIcon}
                  ></wui-icon>
                  ${this.secondaryBtnLabel}
                </wui-button>
              `:null}
      </wui-flex>

      ${this.isWalletConnect?c`
              <wui-flex .padding=${["0","5","5","5"]} justifyContent="center">
                <wui-link
                  @click=${this.onCopyUri}
                  variant="secondary"
                  icon="copy"
                  data-testid="wui-link-copy"
                >
                  Copy link
                </wui-link>
              </wui-flex>
            `:null}

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links></wui-flex>
      </wui-flex>
    `}onShowRetry(){this.error&&!this.showRetry&&(this.showRetry=!0,this.shadowRoot?.querySelector("wui-button")?.animate([{opacity:0},{opacity:1}],{fill:"forwards",easing:"ease"}))}onTryAgain(){L.setWcError(!1),this.onRetry?(this.isRetrying=!0,this.onRetry?.()):this.onConnect?.()}loaderTemplate(){const t=rn.state.themeVariables["--w3m-border-radius-master"],i=t?parseInt(t.replace("px",""),10):4;return c`<wui-loading-thumbnail radius=${i*9}></wui-loading-thumbnail>`}onCopyUri(){try{this.uri&&(N.copyToClopboard(this.uri),Ve.showSuccess("Link copied"))}catch{Ve.showError("Failed to copy")}}}q.styles=Mi;te([x()],q.prototype,"isRetrying",void 0);te([x()],q.prototype,"uri",void 0);te([x()],q.prototype,"error",void 0);te([x()],q.prototype,"ready",void 0);te([x()],q.prototype,"showRetry",void 0);te([x()],q.prototype,"label",void 0);te([x()],q.prototype,"secondaryBtnLabel",void 0);te([x()],q.prototype,"secondaryLabel",void 0);te([x()],q.prototype,"isLoading",void 0);te([u({type:Boolean})],q.prototype,"isMobile",void 0);te([u()],q.prototype,"onRetry",void 0);var Ui=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let xn=class extends q{constructor(){if(super(),!this.wallet)throw new Error("w3m-connecting-wc-browser: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onAutoConnect=this.onConnectProxy.bind(this),ee.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser",displayIndex:this.wallet?.display_index}})}async onConnectProxy(){try{this.error=!1;const{connectors:t}=j.state,i=t.find(r=>r.type==="ANNOUNCED"&&r.info?.rdns===this.wallet?.rdns||r.type==="INJECTED"||r.name===this.wallet?.name);if(i)await L.connectExternal(i,i.chain);else throw new Error("w3m-connecting-wc-browser: No connector found");ii.close(),ee.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"browser",name:this.wallet?.name||"Unknown"}})}catch(t){ee.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:t?.message??"Unknown"}}),this.error=!0}}};xn=Ui([P("w3m-connecting-wc-browser")],xn);var qi=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let Cn=class extends q{constructor(){if(super(),!this.wallet)throw new Error("w3m-connecting-wc-desktop: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onRender=this.onRenderProxy.bind(this),ee.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"desktop",displayIndex:this.wallet?.display_index}})}onRenderProxy(){!this.ready&&this.uri&&(this.ready=!0,this.onConnect?.())}onConnectProxy(){if(this.wallet?.desktop_link&&this.uri)try{this.error=!1;const{desktop_link:t,name:i}=this.wallet,{redirect:r,href:o}=N.formatNativeUrl(t,this.uri);L.setWcLinking({name:i,href:o}),L.setRecentWallet(this.wallet),N.openHref(r,"_blank")}catch{this.error=!0}}};Cn=qi([P("w3m-connecting-wc-desktop")],Cn);var Ne=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let xe=class extends q{constructor(){if(super(),this.btnLabelTimeout=void 0,this.redirectDeeplink=void 0,this.redirectUniversalLink=void 0,this.target=void 0,this.preferUniversalLinks=H.state.experimental_preferUniversalLinks,this.isLoading=!0,this.onConnect=()=>{if(this.wallet?.mobile_link&&this.uri)try{this.error=!1;const{mobile_link:t,link_mode:i,name:r}=this.wallet,{redirect:o,redirectUniversalLink:n,href:s}=N.formatNativeUrl(t,this.uri,i);this.redirectDeeplink=o,this.redirectUniversalLink=n,this.target=N.isIframe()?"_top":"_self",L.setWcLinking({name:r,href:s}),L.setRecentWallet(this.wallet),this.preferUniversalLinks&&this.redirectUniversalLink?N.openHref(this.redirectUniversalLink,this.target):N.openHref(this.redirectDeeplink,this.target)}catch(t){ee.sendEvent({type:"track",event:"CONNECT_PROXY_ERROR",properties:{message:t instanceof Error?t.message:"Error parsing the deeplink",uri:this.uri,mobile_link:this.wallet.mobile_link,name:this.wallet.name}}),this.error=!0}},!this.wallet)throw new Error("w3m-connecting-wc-mobile: No wallet provided");this.secondaryBtnLabel="Open",this.secondaryLabel=oi.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon="externalLink",this.onHandleURI(),this.unsubscribe.push(L.subscribeKey("wcUri",()=>{this.onHandleURI()})),ee.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"mobile",displayIndex:this.wallet?.display_index}})}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.btnLabelTimeout)}onHandleURI(){this.isLoading=!this.uri,!this.ready&&this.uri&&(this.ready=!0,this.onConnect?.())}onTryAgain(){L.setWcError(!1),this.onConnect?.()}};Ne([x()],xe.prototype,"redirectDeeplink",void 0);Ne([x()],xe.prototype,"redirectUniversalLink",void 0);Ne([x()],xe.prototype,"target",void 0);Ne([x()],xe.prototype,"preferUniversalLinks",void 0);Ne([x()],xe.prototype,"isLoading",void 0);xe=Ne([P("w3m-connecting-wc-mobile")],xe);var Ae={},Bt,Rn;function Fi(){return Rn||(Rn=1,Bt=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),Bt}var Lt={},pe={},En;function We(){if(En)return pe;En=1;let e;const t=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return pe.getSymbolSize=function(r){if(!r)throw new Error('"version" cannot be null or undefined');if(r<1||r>40)throw new Error('"version" should be in range from 1 to 40');return r*4+17},pe.getSymbolTotalCodewords=function(r){return t[r]},pe.getBCHDigit=function(i){let r=0;for(;i!==0;)r++,i>>>=1;return r},pe.setToSJISFunction=function(r){if(typeof r!="function")throw new Error('"toSJISFunc" is not a valid function.');e=r},pe.isKanjiModeEnabled=function(){return typeof e<"u"},pe.toSJIS=function(r){return e(r)},pe}var Ot={},In;function hn(){return In||(In=1,function(e){e.L={bit:1},e.M={bit:0},e.Q={bit:3},e.H={bit:2};function t(i){if(typeof i!="string")throw new Error("Param is not a string");switch(i.toLowerCase()){case"l":case"low":return e.L;case"m":case"medium":return e.M;case"q":case"quartile":return e.Q;case"h":case"high":return e.H;default:throw new Error("Unknown EC Level: "+i)}}e.isValid=function(r){return r&&typeof r.bit<"u"&&r.bit>=0&&r.bit<4},e.from=function(r,o){if(e.isValid(r))return r;try{return t(r)}catch{return o}}}(Ot)),Ot}var Nt,_n;function Vi(){if(_n)return Nt;_n=1;function e(){this.buffer=[],this.length=0}return e.prototype={get:function(t){const i=Math.floor(t/8);return(this.buffer[i]>>>7-t%8&1)===1},put:function(t,i){for(let r=0;r<i;r++)this.putBit((t>>>i-r-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(t){const i=Math.floor(this.length/8);this.buffer.length<=i&&this.buffer.push(0),t&&(this.buffer[i]|=128>>>this.length%8),this.length++}},Nt=e,Nt}var kt,Wn;function Hi(){if(Wn)return kt;Wn=1;function e(t){if(!t||t<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new Uint8Array(t*t),this.reservedBit=new Uint8Array(t*t)}return e.prototype.set=function(t,i,r,o){const n=t*this.size+i;this.data[n]=r,o&&(this.reservedBit[n]=!0)},e.prototype.get=function(t,i){return this.data[t*this.size+i]},e.prototype.xor=function(t,i,r){this.data[t*this.size+i]^=r},e.prototype.isReserved=function(t,i){return this.reservedBit[t*this.size+i]},kt=e,kt}var zt={},Sn;function Ki(){return Sn||(Sn=1,function(e){const t=We().getSymbolSize;e.getRowColCoords=function(r){if(r===1)return[];const o=Math.floor(r/7)+2,n=t(r),s=n===145?26:Math.ceil((n-13)/(2*o-2))*2,a=[n-7];for(let l=1;l<o-1;l++)a[l]=a[l-1]-s;return a.push(6),a.reverse()},e.getPositions=function(r){const o=[],n=e.getRowColCoords(r),s=n.length;for(let a=0;a<s;a++)for(let l=0;l<s;l++)a===0&&l===0||a===0&&l===s-1||a===s-1&&l===0||o.push([n[a],n[l]]);return o}}(zt)),zt}var Dt={},Tn;function Gi(){if(Tn)return Dt;Tn=1;const e=We().getSymbolSize,t=7;return Dt.getPositions=function(r){const o=e(r);return[[0,0],[o-t,0],[0,o-t]]},Dt}var jt={},An;function Yi(){return An||(An=1,function(e){e.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const t={N1:3,N2:3,N3:40,N4:10};e.isValid=function(o){return o!=null&&o!==""&&!isNaN(o)&&o>=0&&o<=7},e.from=function(o){return e.isValid(o)?parseInt(o,10):void 0},e.getPenaltyN1=function(o){const n=o.size;let s=0,a=0,l=0,d=null,g=null;for(let E=0;E<n;E++){a=l=0,d=g=null;for(let f=0;f<n;f++){let m=o.get(E,f);m===d?a++:(a>=5&&(s+=t.N1+(a-5)),d=m,a=1),m=o.get(f,E),m===g?l++:(l>=5&&(s+=t.N1+(l-5)),g=m,l=1)}a>=5&&(s+=t.N1+(a-5)),l>=5&&(s+=t.N1+(l-5))}return s},e.getPenaltyN2=function(o){const n=o.size;let s=0;for(let a=0;a<n-1;a++)for(let l=0;l<n-1;l++){const d=o.get(a,l)+o.get(a,l+1)+o.get(a+1,l)+o.get(a+1,l+1);(d===4||d===0)&&s++}return s*t.N2},e.getPenaltyN3=function(o){const n=o.size;let s=0,a=0,l=0;for(let d=0;d<n;d++){a=l=0;for(let g=0;g<n;g++)a=a<<1&2047|o.get(d,g),g>=10&&(a===1488||a===93)&&s++,l=l<<1&2047|o.get(g,d),g>=10&&(l===1488||l===93)&&s++}return s*t.N3},e.getPenaltyN4=function(o){let n=0;const s=o.data.length;for(let l=0;l<s;l++)n+=o.data[l];return Math.abs(Math.ceil(n*100/s/5)-10)*t.N4};function i(r,o,n){switch(r){case e.Patterns.PATTERN000:return(o+n)%2===0;case e.Patterns.PATTERN001:return o%2===0;case e.Patterns.PATTERN010:return n%3===0;case e.Patterns.PATTERN011:return(o+n)%3===0;case e.Patterns.PATTERN100:return(Math.floor(o/2)+Math.floor(n/3))%2===0;case e.Patterns.PATTERN101:return o*n%2+o*n%3===0;case e.Patterns.PATTERN110:return(o*n%2+o*n%3)%2===0;case e.Patterns.PATTERN111:return(o*n%3+(o+n)%2)%2===0;default:throw new Error("bad maskPattern:"+r)}}e.applyMask=function(o,n){const s=n.size;for(let a=0;a<s;a++)for(let l=0;l<s;l++)n.isReserved(l,a)||n.xor(l,a,i(o,l,a))},e.getBestMask=function(o,n){const s=Object.keys(e.Patterns).length;let a=0,l=1/0;for(let d=0;d<s;d++){n(d),e.applyMask(d,o);const g=e.getPenaltyN1(o)+e.getPenaltyN2(o)+e.getPenaltyN3(o)+e.getPenaltyN4(o);e.applyMask(d,o),g<l&&(l=g,a=d)}return a}}(jt)),jt}var ot={},Pn;function ci(){if(Pn)return ot;Pn=1;const e=hn(),t=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],i=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return ot.getBlocksCount=function(o,n){switch(n){case e.L:return t[(o-1)*4+0];case e.M:return t[(o-1)*4+1];case e.Q:return t[(o-1)*4+2];case e.H:return t[(o-1)*4+3];default:return}},ot.getTotalCodewordsCount=function(o,n){switch(n){case e.L:return i[(o-1)*4+0];case e.M:return i[(o-1)*4+1];case e.Q:return i[(o-1)*4+2];case e.H:return i[(o-1)*4+3];default:return}},ot}var Mt={},je={},Bn;function Ji(){if(Bn)return je;Bn=1;const e=new Uint8Array(512),t=new Uint8Array(256);return function(){let r=1;for(let o=0;o<255;o++)e[o]=r,t[r]=o,r<<=1,r&256&&(r^=285);for(let o=255;o<512;o++)e[o]=e[o-255]}(),je.log=function(r){if(r<1)throw new Error("log("+r+")");return t[r]},je.exp=function(r){return e[r]},je.mul=function(r,o){return r===0||o===0?0:e[t[r]+t[o]]},je}var Ln;function Qi(){return Ln||(Ln=1,function(e){const t=Ji();e.mul=function(r,o){const n=new Uint8Array(r.length+o.length-1);for(let s=0;s<r.length;s++)for(let a=0;a<o.length;a++)n[s+a]^=t.mul(r[s],o[a]);return n},e.mod=function(r,o){let n=new Uint8Array(r);for(;n.length-o.length>=0;){const s=n[0];for(let l=0;l<o.length;l++)n[l]^=t.mul(o[l],s);let a=0;for(;a<n.length&&n[a]===0;)a++;n=n.slice(a)}return n},e.generateECPolynomial=function(r){let o=new Uint8Array([1]);for(let n=0;n<r;n++)o=e.mul(o,new Uint8Array([1,t.exp(n)]));return o}}(Mt)),Mt}var Ut,On;function Xi(){if(On)return Ut;On=1;const e=Qi();function t(i){this.genPoly=void 0,this.degree=i,this.degree&&this.initialize(this.degree)}return t.prototype.initialize=function(r){this.degree=r,this.genPoly=e.generateECPolynomial(this.degree)},t.prototype.encode=function(r){if(!this.genPoly)throw new Error("Encoder not initialized");const o=new Uint8Array(r.length+this.degree);o.set(r);const n=e.mod(o,this.genPoly),s=this.degree-n.length;if(s>0){const a=new Uint8Array(this.degree);return a.set(n,s),a}return n},Ut=t,Ut}var qt={},Ft={},Vt={},Nn;function ui(){return Nn||(Nn=1,Vt.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40}),Vt}var ne={},kn;function di(){if(kn)return ne;kn=1;const e="[0-9]+",t="[A-Z $%*+\\-./:]+";let i="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";i=i.replace(/u/g,"\\u");const r="(?:(?![A-Z0-9 $%*+\\-./:]|"+i+`)(?:.|[\r
]))+`;ne.KANJI=new RegExp(i,"g"),ne.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),ne.BYTE=new RegExp(r,"g"),ne.NUMERIC=new RegExp(e,"g"),ne.ALPHANUMERIC=new RegExp(t,"g");const o=new RegExp("^"+i+"$"),n=new RegExp("^"+e+"$"),s=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return ne.testKanji=function(l){return o.test(l)},ne.testNumeric=function(l){return n.test(l)},ne.testAlphanumeric=function(l){return s.test(l)},ne}var zn;function Se(){return zn||(zn=1,function(e){const t=ui(),i=di();e.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},e.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},e.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},e.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},e.MIXED={bit:-1},e.getCharCountIndicator=function(n,s){if(!n.ccBits)throw new Error("Invalid mode: "+n);if(!t.isValid(s))throw new Error("Invalid version: "+s);return s>=1&&s<10?n.ccBits[0]:s<27?n.ccBits[1]:n.ccBits[2]},e.getBestModeForData=function(n){return i.testNumeric(n)?e.NUMERIC:i.testAlphanumeric(n)?e.ALPHANUMERIC:i.testKanji(n)?e.KANJI:e.BYTE},e.toString=function(n){if(n&&n.id)return n.id;throw new Error("Invalid mode")},e.isValid=function(n){return n&&n.bit&&n.ccBits};function r(o){if(typeof o!="string")throw new Error("Param is not a string");switch(o.toLowerCase()){case"numeric":return e.NUMERIC;case"alphanumeric":return e.ALPHANUMERIC;case"kanji":return e.KANJI;case"byte":return e.BYTE;default:throw new Error("Unknown mode: "+o)}}e.from=function(n,s){if(e.isValid(n))return n;try{return r(n)}catch{return s}}}(Ft)),Ft}var Dn;function Zi(){return Dn||(Dn=1,function(e){const t=We(),i=ci(),r=hn(),o=Se(),n=ui(),s=7973,a=t.getBCHDigit(s);function l(f,m,B){for(let v=1;v<=40;v++)if(m<=e.getCapacity(v,B,f))return v}function d(f,m){return o.getCharCountIndicator(f,m)+4}function g(f,m){let B=0;return f.forEach(function(v){const S=d(v.mode,m);B+=S+v.getBitsLength()}),B}function E(f,m){for(let B=1;B<=40;B++)if(g(f,B)<=e.getCapacity(B,m,o.MIXED))return B}e.from=function(m,B){return n.isValid(m)?parseInt(m,10):B},e.getCapacity=function(m,B,v){if(!n.isValid(m))throw new Error("Invalid QR Code version");typeof v>"u"&&(v=o.BYTE);const S=t.getSymbolTotalCodewords(m),b=i.getTotalCodewordsCount(m,B),p=(S-b)*8;if(v===o.MIXED)return p;const w=p-d(v,m);switch(v){case o.NUMERIC:return Math.floor(w/10*3);case o.ALPHANUMERIC:return Math.floor(w/11*2);case o.KANJI:return Math.floor(w/13);case o.BYTE:default:return Math.floor(w/8)}},e.getBestVersionForData=function(m,B){let v;const S=r.from(B,r.M);if(Array.isArray(m)){if(m.length>1)return E(m,S);if(m.length===0)return 1;v=m[0]}else v=m;return l(v.mode,v.getLength(),S)},e.getEncodedBits=function(m){if(!n.isValid(m)||m<7)throw new Error("Invalid QR Code version");let B=m<<12;for(;t.getBCHDigit(B)-a>=0;)B^=s<<t.getBCHDigit(B)-a;return m<<12|B}}(qt)),qt}var Ht={},jn;function eo(){if(jn)return Ht;jn=1;const e=We(),t=1335,i=21522,r=e.getBCHDigit(t);return Ht.getEncodedBits=function(n,s){const a=n.bit<<3|s;let l=a<<10;for(;e.getBCHDigit(l)-r>=0;)l^=t<<e.getBCHDigit(l)-r;return(a<<10|l)^i},Ht}var Kt={},Gt,Mn;function to(){if(Mn)return Gt;Mn=1;const e=Se();function t(i){this.mode=e.NUMERIC,this.data=i.toString()}return t.getBitsLength=function(r){return 10*Math.floor(r/3)+(r%3?r%3*3+1:0)},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(r){let o,n,s;for(o=0;o+3<=this.data.length;o+=3)n=this.data.substr(o,3),s=parseInt(n,10),r.put(s,10);const a=this.data.length-o;a>0&&(n=this.data.substr(o),s=parseInt(n,10),r.put(s,a*3+1))},Gt=t,Gt}var Yt,Un;function no(){if(Un)return Yt;Un=1;const e=Se(),t=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function i(r){this.mode=e.ALPHANUMERIC,this.data=r}return i.getBitsLength=function(o){return 11*Math.floor(o/2)+6*(o%2)},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(o){let n;for(n=0;n+2<=this.data.length;n+=2){let s=t.indexOf(this.data[n])*45;s+=t.indexOf(this.data[n+1]),o.put(s,11)}this.data.length%2&&o.put(t.indexOf(this.data[n]),6)},Yt=i,Yt}var Jt,qn;function io(){return qn||(qn=1,Jt=function(t){for(var i=[],r=t.length,o=0;o<r;o++){var n=t.charCodeAt(o);if(n>=55296&&n<=56319&&r>o+1){var s=t.charCodeAt(o+1);s>=56320&&s<=57343&&(n=(n-55296)*1024+s-56320+65536,o+=1)}if(n<128){i.push(n);continue}if(n<2048){i.push(n>>6|192),i.push(n&63|128);continue}if(n<55296||n>=57344&&n<65536){i.push(n>>12|224),i.push(n>>6&63|128),i.push(n&63|128);continue}if(n>=65536&&n<=1114111){i.push(n>>18|240),i.push(n>>12&63|128),i.push(n>>6&63|128),i.push(n&63|128);continue}i.push(239,191,189)}return new Uint8Array(i).buffer}),Jt}var Qt,Fn;function oo(){if(Fn)return Qt;Fn=1;const e=io(),t=Se();function i(r){this.mode=t.BYTE,typeof r=="string"&&(r=e(r)),this.data=new Uint8Array(r)}return i.getBitsLength=function(o){return o*8},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(r){for(let o=0,n=this.data.length;o<n;o++)r.put(this.data[o],8)},Qt=i,Qt}var Xt,Vn;function ro(){if(Vn)return Xt;Vn=1;const e=Se(),t=We();function i(r){this.mode=e.KANJI,this.data=r}return i.getBitsLength=function(o){return o*13},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(r){let o;for(o=0;o<this.data.length;o++){let n=t.toSJIS(this.data[o]);if(n>=33088&&n<=40956)n-=33088;else if(n>=57408&&n<=60351)n-=49472;else throw new Error("Invalid SJIS character: "+this.data[o]+`
Make sure your charset is UTF-8`);n=(n>>>8&255)*192+(n&255),r.put(n,13)}},Xt=i,Xt}var Hn;function so(){return Hn||(Hn=1,function(e){const t=Se(),i=to(),r=no(),o=oo(),n=ro(),s=di(),a=We(),l=Ei();function d(b){return unescape(encodeURIComponent(b)).length}function g(b,p,w){const h=[];let z;for(;(z=b.exec(w))!==null;)h.push({data:z[0],index:z.index,mode:p,length:z[0].length});return h}function E(b){const p=g(s.NUMERIC,t.NUMERIC,b),w=g(s.ALPHANUMERIC,t.ALPHANUMERIC,b);let h,z;return a.isKanjiModeEnabled()?(h=g(s.BYTE,t.BYTE,b),z=g(s.KANJI,t.KANJI,b)):(h=g(s.BYTE_KANJI,t.BYTE,b),z=[]),p.concat(w,h,z).sort(function(_,I){return _.index-I.index}).map(function(_){return{data:_.data,mode:_.mode,length:_.length}})}function f(b,p){switch(p){case t.NUMERIC:return i.getBitsLength(b);case t.ALPHANUMERIC:return r.getBitsLength(b);case t.KANJI:return n.getBitsLength(b);case t.BYTE:return o.getBitsLength(b)}}function m(b){return b.reduce(function(p,w){const h=p.length-1>=0?p[p.length-1]:null;return h&&h.mode===w.mode?(p[p.length-1].data+=w.data,p):(p.push(w),p)},[])}function B(b){const p=[];for(let w=0;w<b.length;w++){const h=b[w];switch(h.mode){case t.NUMERIC:p.push([h,{data:h.data,mode:t.ALPHANUMERIC,length:h.length},{data:h.data,mode:t.BYTE,length:h.length}]);break;case t.ALPHANUMERIC:p.push([h,{data:h.data,mode:t.BYTE,length:h.length}]);break;case t.KANJI:p.push([h,{data:h.data,mode:t.BYTE,length:d(h.data)}]);break;case t.BYTE:p.push([{data:h.data,mode:t.BYTE,length:d(h.data)}])}}return p}function v(b,p){const w={},h={start:{}};let z=["start"];for(let $=0;$<b.length;$++){const _=b[$],I=[];for(let y=0;y<_.length;y++){const T=_[y],C=""+$+y;I.push(C),w[C]={node:T,lastCount:0},h[C]={};for(let W=0;W<z.length;W++){const R=z[W];w[R]&&w[R].node.mode===T.mode?(h[R][C]=f(w[R].lastCount+T.length,T.mode)-f(w[R].lastCount,T.mode),w[R].lastCount+=T.length):(w[R]&&(w[R].lastCount=T.length),h[R][C]=f(T.length,T.mode)+4+t.getCharCountIndicator(T.mode,p))}}z=I}for(let $=0;$<z.length;$++)h[z[$]].end=0;return{map:h,table:w}}function S(b,p){let w;const h=t.getBestModeForData(b);if(w=t.from(p,h),w!==t.BYTE&&w.bit<h.bit)throw new Error('"'+b+'" cannot be encoded with mode '+t.toString(w)+`.
 Suggested mode is: `+t.toString(h));switch(w===t.KANJI&&!a.isKanjiModeEnabled()&&(w=t.BYTE),w){case t.NUMERIC:return new i(b);case t.ALPHANUMERIC:return new r(b);case t.KANJI:return new n(b);case t.BYTE:return new o(b)}}e.fromArray=function(p){return p.reduce(function(w,h){return typeof h=="string"?w.push(S(h,null)):h.data&&w.push(S(h.data,h.mode)),w},[])},e.fromString=function(p,w){const h=E(p,a.isKanjiModeEnabled()),z=B(h),$=v(z,w),_=l.find_path($.map,"start","end"),I=[];for(let y=1;y<_.length-1;y++)I.push($.table[_[y]].node);return e.fromArray(m(I))},e.rawSplit=function(p){return e.fromArray(E(p,a.isKanjiModeEnabled()))}}(Kt)),Kt}var Kn;function ao(){if(Kn)return Lt;Kn=1;const e=We(),t=hn(),i=Vi(),r=Hi(),o=Ki(),n=Gi(),s=Yi(),a=ci(),l=Xi(),d=Zi(),g=eo(),E=Se(),f=so();function m($,_){const I=$.size,y=n.getPositions(_);for(let T=0;T<y.length;T++){const C=y[T][0],W=y[T][1];for(let R=-1;R<=7;R++)if(!(C+R<=-1||I<=C+R))for(let O=-1;O<=7;O++)W+O<=-1||I<=W+O||(R>=0&&R<=6&&(O===0||O===6)||O>=0&&O<=6&&(R===0||R===6)||R>=2&&R<=4&&O>=2&&O<=4?$.set(C+R,W+O,!0,!0):$.set(C+R,W+O,!1,!0))}}function B($){const _=$.size;for(let I=8;I<_-8;I++){const y=I%2===0;$.set(I,6,y,!0),$.set(6,I,y,!0)}}function v($,_){const I=o.getPositions(_);for(let y=0;y<I.length;y++){const T=I[y][0],C=I[y][1];for(let W=-2;W<=2;W++)for(let R=-2;R<=2;R++)W===-2||W===2||R===-2||R===2||W===0&&R===0?$.set(T+W,C+R,!0,!0):$.set(T+W,C+R,!1,!0)}}function S($,_){const I=$.size,y=d.getEncodedBits(_);let T,C,W;for(let R=0;R<18;R++)T=Math.floor(R/3),C=R%3+I-8-3,W=(y>>R&1)===1,$.set(T,C,W,!0),$.set(C,T,W,!0)}function b($,_,I){const y=$.size,T=g.getEncodedBits(_,I);let C,W;for(C=0;C<15;C++)W=(T>>C&1)===1,C<6?$.set(C,8,W,!0):C<8?$.set(C+1,8,W,!0):$.set(y-15+C,8,W,!0),C<8?$.set(8,y-C-1,W,!0):C<9?$.set(8,15-C-1+1,W,!0):$.set(8,15-C-1,W,!0);$.set(y-8,8,1,!0)}function p($,_){const I=$.size;let y=-1,T=I-1,C=7,W=0;for(let R=I-1;R>0;R-=2)for(R===6&&R--;;){for(let O=0;O<2;O++)if(!$.isReserved(T,R-O)){let fe=!1;W<_.length&&(fe=(_[W]>>>C&1)===1),$.set(T,R-O,fe),C--,C===-1&&(W++,C=7)}if(T+=y,T<0||I<=T){T-=y,y=-y;break}}}function w($,_,I){const y=new i;I.forEach(function(O){y.put(O.mode.bit,4),y.put(O.getLength(),E.getCharCountIndicator(O.mode,$)),O.write(y)});const T=e.getSymbolTotalCodewords($),C=a.getTotalCodewordsCount($,_),W=(T-C)*8;for(y.getLengthInBits()+4<=W&&y.put(0,4);y.getLengthInBits()%8!==0;)y.putBit(0);const R=(W-y.getLengthInBits())/8;for(let O=0;O<R;O++)y.put(O%2?17:236,8);return h(y,$,_)}function h($,_,I){const y=e.getSymbolTotalCodewords(_),T=a.getTotalCodewordsCount(_,I),C=y-T,W=a.getBlocksCount(_,I),R=y%W,O=W-R,fe=Math.floor(y/W),De=Math.floor(C/W),bi=De+1,wn=fe-De,yi=new l(wn);let Wt=0;const it=new Array(W),bn=new Array(W);let St=0;const vi=new Uint8Array($.buffer);for(let Te=0;Te<W;Te++){const At=Te<O?De:bi;it[Te]=vi.slice(Wt,Wt+At),bn[Te]=yi.encode(it[Te]),Wt+=At,St=Math.max(St,At)}const Tt=new Uint8Array(y);let yn=0,se,ae;for(se=0;se<St;se++)for(ae=0;ae<W;ae++)se<it[ae].length&&(Tt[yn++]=it[ae][se]);for(se=0;se<wn;se++)for(ae=0;ae<W;ae++)Tt[yn++]=bn[ae][se];return Tt}function z($,_,I,y){let T;if(Array.isArray($))T=f.fromArray($);else if(typeof $=="string"){let fe=_;if(!fe){const De=f.rawSplit($);fe=d.getBestVersionForData(De,I)}T=f.fromString($,fe||40)}else throw new Error("Invalid data");const C=d.getBestVersionForData(T,I);if(!C)throw new Error("The amount of data is too big to be stored in a QR Code");if(!_)_=C;else if(_<C)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+C+`.
`);const W=w(_,I,T),R=e.getSymbolSize(_),O=new r(R);return m(O,_),B(O),v(O,_),b(O,I,0),_>=7&&S(O,_),p(O,W),isNaN(y)&&(y=s.getBestMask(O,b.bind(null,O,I))),s.applyMask(y,O),b(O,I,y),{modules:O,version:_,errorCorrectionLevel:I,maskPattern:y,segments:T}}return Lt.create=function(_,I){if(typeof _>"u"||_==="")throw new Error("No input text");let y=t.M,T,C;return typeof I<"u"&&(y=t.from(I.errorCorrectionLevel,t.M),T=d.from(I.version),C=s.from(I.maskPattern),I.toSJISFunc&&e.setToSJISFunction(I.toSJISFunc)),z(_,T,y,C)},Lt}var Zt={},en={},Gn;function hi(){return Gn||(Gn=1,function(e){function t(i){if(typeof i=="number"&&(i=i.toString()),typeof i!="string")throw new Error("Color should be defined as hex string");let r=i.slice().replace("#","").split("");if(r.length<3||r.length===5||r.length>8)throw new Error("Invalid hex color: "+i);(r.length===3||r.length===4)&&(r=Array.prototype.concat.apply([],r.map(function(n){return[n,n]}))),r.length===6&&r.push("F","F");const o=parseInt(r.join(""),16);return{r:o>>24&255,g:o>>16&255,b:o>>8&255,a:o&255,hex:"#"+r.slice(0,6).join("")}}e.getOptions=function(r){r||(r={}),r.color||(r.color={});const o=typeof r.margin>"u"||r.margin===null||r.margin<0?4:r.margin,n=r.width&&r.width>=21?r.width:void 0,s=r.scale||4;return{width:n,scale:n?4:s,margin:o,color:{dark:t(r.color.dark||"#000000ff"),light:t(r.color.light||"#ffffffff")},type:r.type,rendererOpts:r.rendererOpts||{}}},e.getScale=function(r,o){return o.width&&o.width>=r+o.margin*2?o.width/(r+o.margin*2):o.scale},e.getImageWidth=function(r,o){const n=e.getScale(r,o);return Math.floor((r+o.margin*2)*n)},e.qrToImageData=function(r,o,n){const s=o.modules.size,a=o.modules.data,l=e.getScale(s,n),d=Math.floor((s+n.margin*2)*l),g=n.margin*l,E=[n.color.light,n.color.dark];for(let f=0;f<d;f++)for(let m=0;m<d;m++){let B=(f*d+m)*4,v=n.color.light;if(f>=g&&m>=g&&f<d-g&&m<d-g){const S=Math.floor((f-g)/l),b=Math.floor((m-g)/l);v=E[a[S*s+b]?1:0]}r[B++]=v.r,r[B++]=v.g,r[B++]=v.b,r[B]=v.a}}}(en)),en}var Yn;function lo(){return Yn||(Yn=1,function(e){const t=hi();function i(o,n,s){o.clearRect(0,0,n.width,n.height),n.style||(n.style={}),n.height=s,n.width=s,n.style.height=s+"px",n.style.width=s+"px"}function r(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}e.render=function(n,s,a){let l=a,d=s;typeof l>"u"&&(!s||!s.getContext)&&(l=s,s=void 0),s||(d=r()),l=t.getOptions(l);const g=t.getImageWidth(n.modules.size,l),E=d.getContext("2d"),f=E.createImageData(g,g);return t.qrToImageData(f.data,n,l),i(E,d,g),E.putImageData(f,0,0),d},e.renderToDataURL=function(n,s,a){let l=a;typeof l>"u"&&(!s||!s.getContext)&&(l=s,s=void 0),l||(l={});const d=e.render(n,s,l),g=l.type||"image/png",E=l.rendererOpts||{};return d.toDataURL(g,E.quality)}}(Zt)),Zt}var tn={},Jn;function co(){if(Jn)return tn;Jn=1;const e=hi();function t(o,n){const s=o.a/255,a=n+'="'+o.hex+'"';return s<1?a+" "+n+'-opacity="'+s.toFixed(2).slice(1)+'"':a}function i(o,n,s){let a=o+n;return typeof s<"u"&&(a+=" "+s),a}function r(o,n,s){let a="",l=0,d=!1,g=0;for(let E=0;E<o.length;E++){const f=Math.floor(E%n),m=Math.floor(E/n);!f&&!d&&(d=!0),o[E]?(g++,E>0&&f>0&&o[E-1]||(a+=d?i("M",f+s,.5+m+s):i("m",l,0),l=0,d=!1),f+1<n&&o[E+1]||(a+=i("h",g),g=0)):l++}return a}return tn.render=function(n,s,a){const l=e.getOptions(s),d=n.modules.size,g=n.modules.data,E=d+l.margin*2,f=l.color.light.a?"<path "+t(l.color.light,"fill")+' d="M0 0h'+E+"v"+E+'H0z"/>':"",m="<path "+t(l.color.dark,"stroke")+' d="'+r(g,d,l.margin)+'"/>',B='viewBox="0 0 '+E+" "+E+'"',S='<svg xmlns="http://www.w3.org/2000/svg" '+(l.width?'width="'+l.width+'" height="'+l.width+'" ':"")+B+' shape-rendering="crispEdges">'+f+m+`</svg>
`;return typeof a=="function"&&a(null,S),S},tn}var Qn;function uo(){if(Qn)return Ae;Qn=1;const e=Fi(),t=ao(),i=lo(),r=co();function o(n,s,a,l,d){const g=[].slice.call(arguments,1),E=g.length,f=typeof g[E-1]=="function";if(!f&&!e())throw new Error("Callback required as last argument");if(f){if(E<2)throw new Error("Too few arguments provided");E===2?(d=a,a=s,s=l=void 0):E===3&&(s.getContext&&typeof d>"u"?(d=l,l=void 0):(d=l,l=a,a=s,s=void 0))}else{if(E<1)throw new Error("Too few arguments provided");return E===1?(a=s,s=l=void 0):E===2&&!s.getContext&&(l=a,a=s,s=void 0),new Promise(function(m,B){try{const v=t.create(a,l);m(n(v,s,l))}catch(v){B(v)}})}try{const m=t.create(a,l);d(null,n(m,s,l))}catch(m){d(m)}}return Ae.create=t.create,Ae.toCanvas=o.bind(null,i.render),Ae.toDataURL=o.bind(null,i.renderToDataURL),Ae.toString=o.bind(null,function(n,s,a){return r.render(n,a)}),Ae}var ho=uo();const fo=Ii(ho),po=.1,Xn=2.5,le=7;function nn(e,t,i){return e===t?!1:(e-t<0?t-e:e-t)<=i+po}function go(e,t){const i=Array.prototype.slice.call(fo.create(e,{errorCorrectionLevel:t}).modules.data,0),r=Math.sqrt(i.length);return i.reduce((o,n,s)=>(s%r===0?o.push([n]):o[o.length-1].push(n))&&o,[])}const mo={generate({uri:e,size:t,logoSize:i,padding:r=8,dotColor:o="var(--apkt-tokens-theme-textInvert)"}){const s=[],a=go(e,"Q"),l=(t-2*r)/a.length,d=[{x:0,y:0},{x:1,y:0},{x:0,y:1}];d.forEach(({x:v,y:S})=>{const b=(a.length-le)*l*v+r,p=(a.length-le)*l*S+r,w=.45;for(let h=0;h<d.length;h+=1){const z=l*(le-h*2);s.push(Me`
            <rect
              fill=${h===2?"var(--apkt-tokens-theme-textInvert)":"var(--apkt-tokens-theme-textPrimary)"}
              width=${h===0?z-10:z}
              rx= ${h===0?(z-10)*w:z*w}
              ry= ${h===0?(z-10)*w:z*w}
              stroke=${o}
              stroke-width=${h===0?10:0}
              height=${h===0?z-10:z}
              x= ${h===0?p+l*h+10/2:p+l*h}
              y= ${h===0?b+l*h+10/2:b+l*h}
            />
          `)}});const g=Math.floor((i+25)/l),E=a.length/2-g/2,f=a.length/2+g/2-1,m=[];a.forEach((v,S)=>{v.forEach((b,p)=>{if(a[S][p]&&!(S<le&&p<le||S>a.length-(le+1)&&p<le||S<le&&p>a.length-(le+1))&&!(S>E&&S<f&&p>E&&p<f)){const w=S*l+l/2+r,h=p*l+l/2+r;m.push([w,h])}})});const B={};return m.forEach(([v,S])=>{B[v]?B[v]?.push(S):B[v]=[S]}),Object.entries(B).map(([v,S])=>{const b=S.filter(p=>S.every(w=>!nn(p,w,l)));return[Number(v),b]}).forEach(([v,S])=>{S.forEach(b=>{s.push(Me`<circle cx=${v} cy=${b} fill=${o} r=${l/Xn} />`)})}),Object.entries(B).filter(([v,S])=>S.length>1).map(([v,S])=>{const b=S.filter(p=>S.some(w=>nn(p,w,l)));return[Number(v),b]}).map(([v,S])=>{S.sort((p,w)=>p<w?-1:1);const b=[];for(const p of S){const w=b.find(h=>h.some(z=>nn(p,z,l)));w?w.push(p):b.push([p])}return[v,b.map(p=>[p[0],p[p.length-1]])]}).forEach(([v,S])=>{S.forEach(([b,p])=>{s.push(Me`
              <line
                x1=${v}
                x2=${v}
                y1=${b}
                y2=${p}
                stroke=${o}
                stroke-width=${l/(Xn/2)}
                stroke-linecap="round"
              />
            `)})}),s}},wo=M`
  :host {
    position: relative;
    user-select: none;
    display: block;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    width: 100%;
    height: 100%;
    background-color: ${({tokens:e})=>e.theme.backgroundInvert};
    color: ${({tokens:e})=>e.theme.textInvert};
  }

  :host {
    border-radius: ${({borderRadius:e})=>e[4]};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host([data-clear='true']) > wui-icon {
    display: none;
  }

  svg:first-child,
  wui-image,
  wui-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    box-shadow: inset 0 0 0 4px ${({tokens:e})=>e.theme.backgroundPrimary};
    border-radius: ${({borderRadius:e})=>e[6]};
  }

  wui-image {
    width: 25%;
    height: 25%;
    border-radius: ${({borderRadius:e})=>e[2]};
  }

  wui-icon {
    width: 100%;
    height: 100%;
    color: #3396ff !important;
    transform: translateY(-50%) translateX(-50%) scale(0.25);
  }

  wui-icon > svg {
    width: inherit;
    height: inherit;
  }
`;var we=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let ie=class extends k{constructor(){super(...arguments),this.uri="",this.size=0,this.theme="dark",this.imageSrc=void 0,this.alt=void 0,this.arenaClear=void 0,this.farcaster=void 0}render(){return this.dataset.theme=this.theme,this.dataset.clear=String(this.arenaClear),this.style.cssText=`--local-size: ${this.size}px`,c`<wui-flex
      alignItems="center"
      justifyContent="center"
      class="wui-qr-code"
      direction="column"
      gap="4"
      width="100%"
      style="height: 100%"
    >
      ${this.templateVisual()} ${this.templateSvg()}
    </wui-flex>`}templateSvg(){return Me`
      <svg height=${this.size} width=${this.size}>
        ${mo.generate({uri:this.uri,size:this.size,logoSize:this.arenaClear?0:this.size/4})}
      </svg>
    `}templateVisual(){return this.imageSrc?c`<wui-image src=${this.imageSrc} alt=${this.alt??"logo"}></wui-image>`:this.farcaster?c`<wui-icon
        class="farcaster"
        size="inherit"
        color="inherit"
        name="farcaster"
      ></wui-icon>`:c`<wui-icon size="inherit" color="inherit" name="walletConnect"></wui-icon>`}};ie.styles=[F,wo];we([u()],ie.prototype,"uri",void 0);we([u({type:Number})],ie.prototype,"size",void 0);we([u()],ie.prototype,"theme",void 0);we([u()],ie.prototype,"imageSrc",void 0);we([u()],ie.prototype,"alt",void 0);we([u({type:Boolean})],ie.prototype,"arenaClear",void 0);we([u({type:Boolean})],ie.prototype,"farcaster",void 0);ie=we([P("wui-qr-code")],ie);const bo=M`
  :host {
    display: block;
    background: linear-gradient(
      90deg,
      ${({tokens:e})=>e.theme.foregroundSecondary} 0%,
      ${({tokens:e})=>e.theme.foregroundTertiary} 50%,
      ${({tokens:e})=>e.theme.foregroundSecondary} 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1s ease-in-out infinite;
    border-radius: ${({borderRadius:e})=>e[2]};
  }

  :host([data-rounded='true']) {
    border-radius: ${({borderRadius:e})=>e[16]};
  }

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;var tt=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let Ce=class extends k{constructor(){super(...arguments),this.width="",this.height="",this.variant="default",this.rounded=!1}render(){return this.style.cssText=`
      width: ${this.width};
      height: ${this.height};
    `,this.dataset.rounded=this.rounded?"true":"false",c`<slot></slot>`}};Ce.styles=[bo];tt([u()],Ce.prototype,"width",void 0);tt([u()],Ce.prototype,"height",void 0);tt([u()],Ce.prototype,"variant",void 0);tt([u({type:Boolean})],Ce.prototype,"rounded",void 0);Ce=tt([P("wui-shimmer")],Ce);const yo=M`
  wui-shimmer {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: ${({borderRadius:e})=>e[4]};
  }

  wui-qr-code {
    opacity: 0;
    animation-duration: ${({durations:e})=>e.xl};
    animation-timing-function: ${({easings:e})=>e["ease-out-power-2"]};
    animation-name: fade-in;
    animation-fill-mode: forwards;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;var vo=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let sn=class extends q{constructor(){super(),this.forceUpdate=()=>{this.requestUpdate()},window.addEventListener("resize",this.forceUpdate),ee.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet?.name??"WalletConnect",platform:"qrcode",displayIndex:this.wallet?.display_index}})}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe?.forEach(t=>t()),window.removeEventListener("resize",this.forceUpdate)}render(){return this.onRenderProxy(),c`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["0","5","5","5"]}
        gap="5"
      >
        <wui-shimmer width="100%"> ${this.qrCodeTemplate()} </wui-shimmer>
        <wui-text variant="lg-medium" color="primary"> Scan this QR Code with your phone </wui-text>
        ${this.copyTemplate()}
      </wui-flex>
      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onRenderProxy(){!this.ready&&this.uri&&(this.timeout=setTimeout(()=>{this.ready=!0},200))}qrCodeTemplate(){if(!this.uri||!this.ready)return null;const t=this.getBoundingClientRect().width-40,i=this.wallet?this.wallet.name:void 0;return L.setWcLinking(void 0),L.setRecentWallet(this.wallet),c` <wui-qr-code
      size=${t}
      theme=${rn.state.themeMode}
      uri=${this.uri}
      imageSrc=${A(K.getWalletImage(this.wallet))}
      color=${A(rn.state.themeVariables["--w3m-qr-color"])}
      alt=${A(i)}
      data-testid="wui-qr-code"
    ></wui-qr-code>`}copyTemplate(){const t=!this.uri||!this.ready;return c`<wui-button
      .disabled=${t}
      @click=${this.onCopyUri}
      variant="neutral-secondary"
      size="sm"
      data-testid="copy-wc2-uri"
    >
      Copy link
      <wui-icon size="sm" color="inherit" name="copy" slot="iconRight"></wui-icon>
    </wui-button>`}};sn.styles=yo;sn=vo([P("w3m-connecting-wc-qrcode")],sn);var $o=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let Zn=class extends k{constructor(){if(super(),this.wallet=U.state.data?.wallet,!this.wallet)throw new Error("w3m-connecting-wc-unsupported: No wallet provided");ee.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser",displayIndex:this.wallet?.display_index}})}render(){return c`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["10","5","5","5"]}
        gap="5"
      >
        <wui-wallet-image
          size="lg"
          imageSrc=${A(K.getWalletImage(this.wallet))}
        ></wui-wallet-image>

        <wui-text variant="md-regular" color="primary">Not Detected</wui-text>
      </wui-flex>

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}};Zn=$o([P("w3m-connecting-wc-unsupported")],Zn);var fi=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let an=class extends q{constructor(){if(super(),this.isLoading=!0,!this.wallet)throw new Error("w3m-connecting-wc-web: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.secondaryBtnLabel="Open",this.secondaryLabel=oi.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon="externalLink",this.updateLoadingState(),this.unsubscribe.push(L.subscribeKey("wcUri",()=>{this.updateLoadingState()})),ee.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"web",displayIndex:this.wallet?.display_index}})}updateLoadingState(){this.isLoading=!this.uri}onConnectProxy(){if(this.wallet?.webapp_link&&this.uri)try{this.error=!1;const{webapp_link:t,name:i}=this.wallet,{redirect:r,href:o}=N.formatUniversalUrl(t,this.uri);L.setWcLinking({name:i,href:o}),L.setRecentWallet(this.wallet),N.openHref(r,"_blank")}catch{this.error=!0}}};fi([x()],an.prototype,"isLoading",void 0);an=fi([P("w3m-connecting-wc-web")],an);var ke=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let Re=class extends k{constructor(){super(),this.wallet=U.state.data?.wallet,this.unsubscribe=[],this.platform=void 0,this.platforms=[],this.isSiwxEnabled=!!H.state.siwx,this.remoteFeatures=H.state.remoteFeatures,this.displayBranding=!0,this.determinePlatforms(),this.initializeConnection(),this.unsubscribe.push(H.subscribeKey("remoteFeatures",t=>this.remoteFeatures=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){return c`
      ${this.headerTemplate()}
      <div>${this.platformTemplate()}</div>
      ${this.reownBrandingTemplate()}
    `}reownBrandingTemplate(){return!this.remoteFeatures?.reownBranding||!this.displayBranding?null:c`<wui-ux-by-reown></wui-ux-by-reown>`}async initializeConnection(t=!1){if(!(this.platform==="browser"||H.state.manualWCControl&&!t))try{const{wcPairingExpiry:i,status:r}=L.state;if(t||H.state.enableEmbedded||N.isPairingExpired(i)||r==="connecting"){const o=L.getConnections(ce.state.activeChain),n=this.remoteFeatures?.multiWallet,s=o.length>0;await L.connectWalletConnect({cache:"never"}),this.isSiwxEnabled||(s&&n?(U.replace("ProfileWallets"),Ve.showSuccess("New Wallet Added")):ii.close())}}catch(i){if(i instanceof Error&&i.message.includes("An error occurred when attempting to switch chain")&&!H.state.enableNetworkSwitch&&ce.state.activeChain){ce.setActiveCaipNetwork($i.getUnsupportedNetwork(`${ce.state.activeChain}:${ce.state.activeCaipNetwork?.id}`)),ce.showUnsupportedChainUI();return}ee.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:i?.message??"Unknown"}}),L.setWcError(!0),Ve.showError(i.message??"Connection error"),L.resetWcConnection(),U.goBack()}}determinePlatforms(){if(!this.wallet){this.platforms.push("qrcode"),this.platform="qrcode";return}if(this.platform)return;const{mobile_link:t,desktop_link:i,webapp_link:r,injected:o,rdns:n}=this.wallet,s=o?.map(({injected_id:B})=>B).filter(Boolean),a=[...n?[n]:s??[]],l=H.state.isUniversalProvider?!1:a.length,d=t,g=r,E=L.checkInstalled(a),f=l&&E,m=i&&!N.isMobile();f&&!ce.state.noAdapters&&this.platforms.push("browser"),d&&this.platforms.push(N.isMobile()?"mobile":"qrcode"),g&&this.platforms.push("web"),m&&this.platforms.push("desktop"),!f&&l&&!ce.state.noAdapters&&this.platforms.push("unsupported"),this.platform=this.platforms[0]}platformTemplate(){switch(this.platform){case"browser":return c`<w3m-connecting-wc-browser></w3m-connecting-wc-browser>`;case"web":return c`<w3m-connecting-wc-web></w3m-connecting-wc-web>`;case"desktop":return c`
          <w3m-connecting-wc-desktop .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-desktop>
        `;case"mobile":return c`
          <w3m-connecting-wc-mobile isMobile .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-mobile>
        `;case"qrcode":return c`<w3m-connecting-wc-qrcode></w3m-connecting-wc-qrcode>`;default:return c`<w3m-connecting-wc-unsupported></w3m-connecting-wc-unsupported>`}}headerTemplate(){return this.platforms.length>1?c`
      <w3m-connecting-header
        .platforms=${this.platforms}
        .onSelectPlatfrom=${this.onSelectPlatform.bind(this)}
      >
      </w3m-connecting-header>
    `:null}async onSelectPlatform(t){const i=this.shadowRoot?.querySelector("div");i&&(await i.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.platform=t,i.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}};ke([x()],Re.prototype,"platform",void 0);ke([x()],Re.prototype,"platforms",void 0);ke([x()],Re.prototype,"isSiwxEnabled",void 0);ke([x()],Re.prototype,"remoteFeatures",void 0);ke([u({type:Boolean})],Re.prototype,"displayBranding",void 0);Re=ke([P("w3m-connecting-wc-view")],Re);var fn=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let ht=class extends k{constructor(){super(),this.unsubscribe=[],this.isMobile=N.isMobile(),this.remoteFeatures=H.state.remoteFeatures,this.unsubscribe.push(H.subscribeKey("remoteFeatures",t=>this.remoteFeatures=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){if(this.isMobile){const{featured:t,recommended:i}=D.state,{customWallets:r}=H.state,o=bt.getRecentWallets(),n=t.length||i.length||r?.length||o.length;return c`<wui-flex flexDirection="column" gap="2" .margin=${["1","3","3","3"]}>
        ${n?c`<w3m-connector-list></w3m-connector-list>`:null}
        <w3m-all-wallets-widget></w3m-all-wallets-widget>
      </wui-flex>`}return c`<wui-flex flexDirection="column" .padding=${["0","0","4","0"]}>
        <w3m-connecting-wc-view .displayBranding=${!1}></w3m-connecting-wc-view>
        <wui-flex flexDirection="column" .padding=${["0","3","0","3"]}>
          <w3m-all-wallets-widget></w3m-all-wallets-widget>
        </wui-flex>
      </wui-flex>
      ${this.reownBrandingTemplate()} `}reownBrandingTemplate(){return this.remoteFeatures?.reownBranding?c` <wui-flex flexDirection="column" .padding=${["1","0","1","0"]}>
      <wui-ux-by-reown></wui-ux-by-reown>
    </wui-flex>`:null}};fn([x()],ht.prototype,"isMobile",void 0);fn([x()],ht.prototype,"remoteFeatures",void 0);ht=fn([P("w3m-connecting-wc-basic-view")],ht);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const xo=e=>e.strings===void 0;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ue=(e,t)=>{const i=e._$AN;if(i===void 0)return!1;for(const r of i)r._$AO?.(t,!1),Ue(r,t);return!0},ft=e=>{let t,i;do{if((t=e._$AM)===void 0)break;i=t._$AN,i.delete(e),e=t}while(i?.size===0)},pi=e=>{for(let t;t=e._$AM;e=t){let i=t._$AN;if(i===void 0)t._$AN=i=new Set;else if(i.has(e))break;i.add(e),Eo(t)}};function Co(e){this._$AN!==void 0?(ft(this),this._$AM=e,pi(this)):this._$AM=e}function Ro(e,t=!1,i=0){const r=this._$AH,o=this._$AN;if(o!==void 0&&o.size!==0)if(t)if(Array.isArray(r))for(let n=i;n<r.length;n++)Ue(r[n],!1),ft(r[n]);else r!=null&&(Ue(r,!1),ft(r));else Ue(this,e)}const Eo=e=>{e.type==Ci.CHILD&&(e._$AP??=Ro,e._$AQ??=Co)};class Io extends xi{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,i,r){super._$AT(t,i,r),pi(this),this.isConnected=t._$AU}_$AO(t,i=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),i&&(Ue(this,t),ft(this))}setValue(t){if(xo(this._$Ct))this._$Ct._$AI(t,this);else{const i=[...this._$Ct._$AH];i[this._$Ci]=t,this._$Ct._$AI(i,this,0)}}disconnected(){}reconnected(){}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pn=()=>new _o;class _o{}const on=new WeakMap,gn=Ri(class extends Io{render(e){return $n}update(e,[t]){const i=t!==this.G;return i&&this.G!==void 0&&this.rt(void 0),(i||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),$n}rt(e){if(this.isConnected||(e=void 0),typeof this.G=="function"){const t=this.ht??globalThis;let i=on.get(t);i===void 0&&(i=new WeakMap,on.set(t,i)),i.get(this.G)!==void 0&&this.G.call(this.ht,void 0),i.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){return typeof this.G=="function"?on.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),Wo=M`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  label {
    position: relative;
    display: inline-block;
    user-select: none;
    transition:
      background-color ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      color ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      border ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      box-shadow ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      width ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      height ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      transform ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      opacity ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color, color, border, box-shadow, width, height, transform, opacity;
  }

  input {
    width: 0;
    height: 0;
    opacity: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({colors:e})=>e.neutrals300};
    border-radius: ${({borderRadius:e})=>e.round};
    border: 1px solid transparent;
    will-change: border;
    transition:
      background-color ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      color ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      border ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      box-shadow ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      width ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      height ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      transform ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      opacity ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color, color, border, box-shadow, width, height, transform, opacity;
  }

  span:before {
    content: '';
    position: absolute;
    background-color: ${({colors:e})=>e.white};
    border-radius: 50%;
  }

  /* -- Sizes --------------------------------------------------------- */
  label[data-size='lg'] {
    width: 48px;
    height: 32px;
  }

  label[data-size='md'] {
    width: 40px;
    height: 28px;
  }

  label[data-size='sm'] {
    width: 32px;
    height: 22px;
  }

  label[data-size='lg'] > span:before {
    height: 24px;
    width: 24px;
    left: 4px;
    top: 3px;
  }

  label[data-size='md'] > span:before {
    height: 20px;
    width: 20px;
    left: 4px;
    top: 3px;
  }

  label[data-size='sm'] > span:before {
    height: 16px;
    width: 16px;
    left: 3px;
    top: 2px;
  }

  /* -- Focus states --------------------------------------------------- */
  input:focus-visible:not(:checked) + span,
  input:focus:not(:checked) + span {
    border: 1px solid ${({tokens:e})=>e.core.iconAccentPrimary};
    background-color: ${({tokens:e})=>e.theme.textTertiary};
    box-shadow: 0px 0px 0px 4px rgba(9, 136, 240, 0.2);
  }

  input:focus-visible:checked + span,
  input:focus:checked + span {
    border: 1px solid ${({tokens:e})=>e.core.iconAccentPrimary};
    box-shadow: 0px 0px 0px 4px rgba(9, 136, 240, 0.2);
  }

  /* -- Checked states --------------------------------------------------- */
  input:checked + span {
    background-color: ${({tokens:e})=>e.core.iconAccentPrimary};
  }

  label[data-size='lg'] > input:checked + span:before {
    transform: translateX(calc(100% - 9px));
  }

  label[data-size='md'] > input:checked + span:before {
    transform: translateX(calc(100% - 9px));
  }

  label[data-size='sm'] > input:checked + span:before {
    transform: translateX(calc(100% - 7px));
  }

  /* -- Hover states ------------------------------------------------------- */
  label:hover > input:not(:checked):not(:disabled) + span {
    background-color: ${({colors:e})=>e.neutrals400};
  }

  label:hover > input:checked:not(:disabled) + span {
    background-color: ${({colors:e})=>e.accent080};
  }

  /* -- Disabled state --------------------------------------------------- */
  label:has(input:disabled) {
    pointer-events: none;
    user-select: none;
  }

  input:not(:checked):disabled + span {
    background-color: ${({colors:e})=>e.neutrals700};
  }

  input:checked:disabled + span {
    background-color: ${({colors:e})=>e.neutrals700};
  }

  input:not(:checked):disabled + span::before {
    background-color: ${({colors:e})=>e.neutrals400};
  }

  input:checked:disabled + span::before {
    background-color: ${({tokens:e})=>e.theme.textTertiary};
  }
`;var It=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let Be=class extends k{constructor(){super(...arguments),this.inputElementRef=pn(),this.checked=!1,this.disabled=!1,this.size="md"}render(){return c`
      <label data-size=${this.size}>
        <input
          ${gn(this.inputElementRef)}
          type="checkbox"
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this.dispatchChangeEvent.bind(this)}
        />
        <span></span>
      </label>
    `}dispatchChangeEvent(){this.dispatchEvent(new CustomEvent("switchChange",{detail:this.inputElementRef.value?.checked,bubbles:!0,composed:!0}))}};Be.styles=[F,oe,Wo];It([u({type:Boolean})],Be.prototype,"checked",void 0);It([u({type:Boolean})],Be.prototype,"disabled",void 0);It([u()],Be.prototype,"size",void 0);Be=It([P("wui-toggle")],Be);const So=M`
  :host {
    height: auto;
  }

  :host > wui-flex {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: ${({spacing:e})=>e[2]};
    padding: ${({spacing:e})=>e[2]} ${({spacing:e})=>e[3]};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: ${({borderRadius:e})=>e[4]};
    box-shadow: inset 0 0 0 1px ${({tokens:e})=>e.theme.foregroundPrimary};
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color;
    cursor: pointer;
  }

  wui-switch {
    pointer-events: none;
  }
`;var gi=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let pt=class extends k{constructor(){super(...arguments),this.checked=!1}render(){return c`
      <wui-flex>
        <wui-icon size="xl" name="walletConnectBrown"></wui-icon>
        <wui-toggle
          ?checked=${this.checked}
          size="sm"
          @switchChange=${this.handleToggleChange.bind(this)}
        ></wui-toggle>
      </wui-flex>
    `}handleToggleChange(t){t.stopPropagation(),this.checked=t.detail,this.dispatchSwitchEvent()}dispatchSwitchEvent(){this.dispatchEvent(new CustomEvent("certifiedSwitchChange",{detail:this.checked,bubbles:!0,composed:!0}))}};pt.styles=[F,oe,So];gi([u({type:Boolean})],pt.prototype,"checked",void 0);pt=gi([P("wui-certified-switch")],pt);const To=M`
  :host {
    position: relative;
    width: 100%;
    display: inline-flex;
    flex-direction: column;
    gap: ${({spacing:e})=>e[3]};
    color: ${({tokens:e})=>e.theme.textPrimary};
    caret-color: ${({tokens:e})=>e.core.textAccentPrimary};
  }

  .wui-input-text-container {
    position: relative;
    display: flex;
  }

  input {
    width: 100%;
    border-radius: ${({borderRadius:e})=>e[4]};
    color: inherit;
    background: transparent;
    border: 1px solid ${({tokens:e})=>e.theme.borderPrimary};
    caret-color: ${({tokens:e})=>e.core.textAccentPrimary};
    padding: ${({spacing:e})=>e[3]} ${({spacing:e})=>e[3]}
      ${({spacing:e})=>e[3]} ${({spacing:e})=>e[10]};
    font-size: ${({textSize:e})=>e.large};
    line-height: ${({typography:e})=>e["lg-regular"].lineHeight};
    letter-spacing: ${({typography:e})=>e["lg-regular"].letterSpacing};
    font-weight: ${({fontWeight:e})=>e.regular};
    font-family: ${({fontFamily:e})=>e.regular};
  }

  input[data-size='lg'] {
    padding: ${({spacing:e})=>e[4]} ${({spacing:e})=>e[3]}
      ${({spacing:e})=>e[4]} ${({spacing:e})=>e[10]};
  }

  @media (hover: hover) and (pointer: fine) {
    input:hover:enabled {
      border: 1px solid ${({tokens:e})=>e.theme.borderSecondary};
    }
  }

  input:disabled {
    cursor: unset;
    border: 1px solid ${({tokens:e})=>e.theme.borderPrimary};
  }

  input::placeholder {
    color: ${({tokens:e})=>e.theme.textSecondary};
  }

  input:focus:enabled {
    border: 1px solid ${({tokens:e})=>e.theme.borderSecondary};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    -webkit-box-shadow: 0px 0px 0px 4px ${({tokens:e})=>e.core.foregroundAccent040};
    -moz-box-shadow: 0px 0px 0px 4px ${({tokens:e})=>e.core.foregroundAccent040};
    box-shadow: 0px 0px 0px 4px ${({tokens:e})=>e.core.foregroundAccent040};
  }

  div.wui-input-text-container:has(input:disabled) {
    opacity: 0.5;
  }

  wui-icon.wui-input-text-left-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    left: ${({spacing:e})=>e[4]};
    color: ${({tokens:e})=>e.theme.iconDefault};
  }

  button.wui-input-text-submit-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: ${({spacing:e})=>e[3]};
    width: 24px;
    height: 24px;
    border: none;
    background: transparent;
    border-radius: ${({borderRadius:e})=>e[2]};
    color: ${({tokens:e})=>e.core.textAccentPrimary};
  }

  button.wui-input-text-submit-button:disabled {
    opacity: 1;
  }

  button.wui-input-text-submit-button.loading wui-icon {
    animation: spin 1s linear infinite;
  }

  button.wui-input-text-submit-button:hover {
    background: ${({tokens:e})=>e.core.foregroundAccent010};
  }

  input:has(+ .wui-input-text-submit-button) {
    padding-right: ${({spacing:e})=>e[12]};
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  input[type='search']::-webkit-search-decoration,
  input[type='search']::-webkit-search-cancel-button,
  input[type='search']::-webkit-search-results-button,
  input[type='search']::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  /* -- Keyframes --------------------------------------------------- */
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;var X=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let G=class extends k{constructor(){super(...arguments),this.inputElementRef=pn(),this.disabled=!1,this.loading=!1,this.placeholder="",this.type="text",this.value="",this.size="md"}render(){return c` <div class="wui-input-text-container">
        ${this.templateLeftIcon()}
        <input
          data-size=${this.size}
          ${gn(this.inputElementRef)}
          data-testid="wui-input-text"
          type=${this.type}
          enterkeyhint=${A(this.enterKeyHint)}
          ?disabled=${this.disabled}
          placeholder=${this.placeholder}
          @input=${this.dispatchInputChangeEvent.bind(this)}
          @keydown=${this.onKeyDown}
          .value=${this.value||""}
        />
        ${this.templateSubmitButton()}
        <slot class="wui-input-text-slot"></slot>
      </div>
      ${this.templateError()} ${this.templateWarning()}`}templateLeftIcon(){return this.icon?c`<wui-icon
        class="wui-input-text-left-icon"
        size="md"
        data-size=${this.size}
        color="inherit"
        name=${this.icon}
      ></wui-icon>`:null}templateSubmitButton(){return this.onSubmit?c`<button
        class="wui-input-text-submit-button ${this.loading?"loading":""}"
        @click=${this.onSubmit?.bind(this)}
        ?disabled=${this.disabled||this.loading}
      >
        ${this.loading?c`<wui-icon name="spinner" size="md"></wui-icon>`:c`<wui-icon name="chevronRight" size="md"></wui-icon>`}
      </button>`:null}templateError(){return this.errorText?c`<wui-text variant="sm-regular" color="error">${this.errorText}</wui-text>`:null}templateWarning(){return this.warningText?c`<wui-text variant="sm-regular" color="warning">${this.warningText}</wui-text>`:null}dispatchInputChangeEvent(){this.dispatchEvent(new CustomEvent("inputChange",{detail:this.inputElementRef.value?.value,bubbles:!0,composed:!0}))}};G.styles=[F,oe,To];X([u()],G.prototype,"icon",void 0);X([u({type:Boolean})],G.prototype,"disabled",void 0);X([u({type:Boolean})],G.prototype,"loading",void 0);X([u()],G.prototype,"placeholder",void 0);X([u()],G.prototype,"type",void 0);X([u()],G.prototype,"value",void 0);X([u()],G.prototype,"errorText",void 0);X([u()],G.prototype,"warningText",void 0);X([u()],G.prototype,"onSubmit",void 0);X([u()],G.prototype,"size",void 0);X([u({attribute:!1})],G.prototype,"onKeyDown",void 0);G=X([P("wui-input-text")],G);const Ao=M`
  :host {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  wui-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: ${({spacing:e})=>e[3]};
    color: ${({tokens:e})=>e.theme.iconDefault};
    cursor: pointer;
    padding: ${({spacing:e})=>e[2]};
    background-color: transparent;
    border-radius: ${({borderRadius:e})=>e[4]};
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
  }

  @media (hover: hover) {
    wui-icon:hover {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }
  }
`;var mi=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let gt=class extends k{constructor(){super(...arguments),this.inputComponentRef=pn(),this.inputValue=""}render(){return c`
      <wui-input-text
        ${gn(this.inputComponentRef)}
        placeholder="Search wallet"
        icon="search"
        type="search"
        enterKeyHint="search"
        size="sm"
        @inputChange=${this.onInputChange}
      >
        ${this.inputValue?c`<wui-icon
              @click=${this.clearValue}
              color="inherit"
              size="sm"
              name="close"
            ></wui-icon>`:null}
      </wui-input-text>
    `}onInputChange(t){this.inputValue=t.detail||""}clearValue(){const i=this.inputComponentRef.value?.inputElementRef.value;i&&(i.value="",this.inputValue="",i.focus(),i.dispatchEvent(new Event("input")))}};gt.styles=[F,Ao];mi([u()],gt.prototype,"inputValue",void 0);gt=mi([P("wui-search-bar")],gt);const Po=Me`<svg  viewBox="0 0 48 54" fill="none">
  <path
    d="M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z"
  />
</svg>`,Bo=M`
  :host {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 104px;
    width: 104px;
    row-gap: ${({spacing:e})=>e[2]};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: ${({borderRadius:e})=>e[5]};
    position: relative;
  }

  wui-shimmer[data-type='network'] {
    border: none;
    -webkit-clip-path: var(--apkt-path-network);
    clip-path: var(--apkt-path-network);
  }

  svg {
    position: absolute;
    width: 48px;
    height: 54px;
    z-index: 1;
  }

  svg > path {
    stroke: ${({tokens:e})=>e.theme.foregroundSecondary};
    stroke-width: 1px;
  }

  @media (max-width: 350px) {
    :host {
      width: 100%;
    }
  }
`;var wi=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let mt=class extends k{constructor(){super(...arguments),this.type="wallet"}render(){return c`
      ${this.shimmerTemplate()}
      <wui-shimmer width="80px" height="20px"></wui-shimmer>
    `}shimmerTemplate(){return this.type==="network"?c` <wui-shimmer data-type=${this.type} width="48px" height="54px"></wui-shimmer>
        ${Po}`:c`<wui-shimmer width="56px" height="56px"></wui-shimmer>`}};mt.styles=[F,oe,Bo];wi([u()],mt.prototype,"type",void 0);mt=wi([P("wui-card-select-loader")],mt);const Lo=ri`
  :host {
    display: grid;
    width: inherit;
    height: inherit;
  }
`;var Z=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let Y=class extends k{render(){return this.style.cssText=`
      grid-template-rows: ${this.gridTemplateRows};
      grid-template-columns: ${this.gridTemplateColumns};
      justify-items: ${this.justifyItems};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      align-content: ${this.alignContent};
      column-gap: ${this.columnGap&&`var(--apkt-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap&&`var(--apkt-spacing-${this.rowGap})`};
      gap: ${this.gap&&`var(--apkt-spacing-${this.gap})`};
      padding-top: ${this.padding&&ue.getSpacingStyles(this.padding,0)};
      padding-right: ${this.padding&&ue.getSpacingStyles(this.padding,1)};
      padding-bottom: ${this.padding&&ue.getSpacingStyles(this.padding,2)};
      padding-left: ${this.padding&&ue.getSpacingStyles(this.padding,3)};
      margin-top: ${this.margin&&ue.getSpacingStyles(this.margin,0)};
      margin-right: ${this.margin&&ue.getSpacingStyles(this.margin,1)};
      margin-bottom: ${this.margin&&ue.getSpacingStyles(this.margin,2)};
      margin-left: ${this.margin&&ue.getSpacingStyles(this.margin,3)};
    `,c`<slot></slot>`}};Y.styles=[F,Lo];Z([u()],Y.prototype,"gridTemplateRows",void 0);Z([u()],Y.prototype,"gridTemplateColumns",void 0);Z([u()],Y.prototype,"justifyItems",void 0);Z([u()],Y.prototype,"alignItems",void 0);Z([u()],Y.prototype,"justifyContent",void 0);Z([u()],Y.prototype,"alignContent",void 0);Z([u()],Y.prototype,"columnGap",void 0);Z([u()],Y.prototype,"rowGap",void 0);Z([u()],Y.prototype,"gap",void 0);Z([u()],Y.prototype,"padding",void 0);Z([u()],Y.prototype,"margin",void 0);Y=Z([P("wui-grid")],Y);const Oo=M`
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 104px;
    row-gap: ${({spacing:e})=>e[2]};
    padding: ${({spacing:e})=>e[3]} ${({spacing:e})=>e[0]};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: clamp(0px, ${({borderRadius:e})=>e[4]}, 20px);
    transition:
      color ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-1"]},
      background-color ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-1"]},
      border-radius ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-1"]};
    will-change: background-color, color, border-radius;
    outline: none;
    border: none;
  }

  button > wui-flex > wui-text {
    color: ${({tokens:e})=>e.theme.textPrimary};
    max-width: 86px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: center;
  }

  button > wui-flex > wui-text.certified {
    max-width: 66px;
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }
  }

  button:disabled > wui-flex > wui-text {
    color: ${({tokens:e})=>e.core.glass010};
  }

  [data-selected='true'] {
    background-color: ${({colors:e})=>e.accent020};
  }

  @media (hover: hover) and (pointer: fine) {
    [data-selected='true']:hover:enabled {
      background-color: ${({colors:e})=>e.accent010};
    }
  }

  [data-selected='true']:active:enabled {
    background-color: ${({colors:e})=>e.accent010};
  }

  @media (max-width: 350px) {
    button {
      width: 100%;
    }
  }
`;var nt=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let Ee=class extends k{constructor(){super(),this.observer=new IntersectionObserver(()=>{}),this.visible=!1,this.imageSrc=void 0,this.imageLoading=!1,this.wallet=void 0,this.observer=new IntersectionObserver(t=>{t.forEach(i=>{i.isIntersecting?(this.visible=!0,this.fetchImageSrc()):this.visible=!1})},{threshold:.01})}firstUpdated(){this.observer.observe(this)}disconnectedCallback(){this.observer.disconnect()}render(){const t=this.wallet?.badge_type==="certified";return c`
      <button>
        ${this.imageTemplate()}
        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="1">
          <wui-text
            variant="md-regular"
            color="inherit"
            class=${A(t?"certified":void 0)}
            >${this.wallet?.name}</wui-text
          >
          ${t?c`<wui-icon size="sm" name="walletConnectBrown"></wui-icon>`:null}
        </wui-flex>
      </button>
    `}imageTemplate(){return!this.visible&&!this.imageSrc||this.imageLoading?this.shimmerTemplate():c`
      <wui-wallet-image
        size="lg"
        imageSrc=${A(this.imageSrc)}
        name=${this.wallet?.name}
        .installed=${this.wallet?.installed}
        badgeSize="sm"
      >
      </wui-wallet-image>
    `}shimmerTemplate(){return c`<wui-shimmer width="56px" height="56px"></wui-shimmer>`}async fetchImageSrc(){this.wallet&&(this.imageSrc=K.getWalletImage(this.wallet),!this.imageSrc&&(this.imageLoading=!0,this.imageSrc=await K.fetchWalletImage(this.wallet.image_id),this.imageLoading=!1))}};Ee.styles=Oo;nt([x()],Ee.prototype,"visible",void 0);nt([x()],Ee.prototype,"imageSrc",void 0);nt([x()],Ee.prototype,"imageLoading",void 0);nt([u()],Ee.prototype,"wallet",void 0);Ee=nt([P("w3m-all-wallets-list-item")],Ee);const No=M`
  wui-grid {
    max-height: clamp(360px, 400px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  w3m-all-wallets-list-item {
    opacity: 0;
    animation-duration: ${({durations:e})=>e.xl};
    animation-timing-function: ${({easings:e})=>e["ease-inout-power-2"]};
    animation-name: fade-in;
    animation-fill-mode: forwards;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  wui-loading-spinner {
    padding-top: ${({spacing:e})=>e[4]};
    padding-bottom: ${({spacing:e})=>e[4]};
    justify-content: center;
    grid-column: 1 / span 4;
  }
`;var ze=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};const ei="local-paginator";let me=class extends k{constructor(){super(),this.unsubscribe=[],this.paginationObserver=void 0,this.loading=!D.state.wallets.length,this.wallets=D.state.wallets,this.recommended=D.state.recommended,this.featured=D.state.featured,this.filteredWallets=D.state.filteredWallets,this.unsubscribe.push(D.subscribeKey("wallets",t=>this.wallets=t),D.subscribeKey("recommended",t=>this.recommended=t),D.subscribeKey("featured",t=>this.featured=t),D.subscribeKey("filteredWallets",t=>this.filteredWallets=t))}firstUpdated(){this.initialFetch(),this.createPaginationObserver()}disconnectedCallback(){this.unsubscribe.forEach(t=>t()),this.paginationObserver?.disconnect()}render(){return c`
      <wui-grid
        data-scroll=${!this.loading}
        .padding=${["0","3","3","3"]}
        gap="2"
        justifyContent="space-between"
      >
        ${this.loading?this.shimmerTemplate(16):this.walletsTemplate()}
        ${this.paginationLoaderTemplate()}
      </wui-grid>
    `}async initialFetch(){this.loading=!0;const t=this.shadowRoot?.querySelector("wui-grid");t&&(await D.fetchWalletsByPage({page:1}),await t.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.loading=!1,t.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}shimmerTemplate(t,i){return[...Array(t)].map(()=>c`
        <wui-card-select-loader type="wallet" id=${A(i)}></wui-card-select-loader>
      `)}getWallets(){const t=[...this.featured,...this.recommended];this.filteredWallets?.length>0?t.push(...this.filteredWallets):t.push(...this.wallets);const i=N.uniqueBy(t,"id"),r=Fe.markWalletsAsInstalled(i);return Fe.markWalletsWithDisplayIndex(r)}walletsTemplate(){return this.getWallets().map(i=>c`
        <w3m-all-wallets-list-item
          data-testid="wallet-search-item-${i.id}"
          @click=${()=>this.onConnectWallet(i)}
          .wallet=${i}
        ></w3m-all-wallets-list-item>
      `)}paginationLoaderTemplate(){const{wallets:t,recommended:i,featured:r,count:o}=D.state,n=window.innerWidth<352?3:4,s=t.length+i.length;let l=Math.ceil(s/n)*n-s+n;return l-=t.length?r.length%n:0,o===0&&r.length>0?null:o===0||[...r,...t,...i].length<o?this.shimmerTemplate(l,ei):null}createPaginationObserver(){const t=this.shadowRoot?.querySelector(`#${ei}`);t&&(this.paginationObserver=new IntersectionObserver(([i])=>{if(i?.isIntersecting&&!this.loading){const{page:r,count:o,wallets:n}=D.state;n.length<o&&D.fetchWalletsByPage({page:r+1})}}),this.paginationObserver.observe(t))}onConnectWallet(t){j.selectWalletConnector(t)}};me.styles=No;ze([x()],me.prototype,"loading",void 0);ze([x()],me.prototype,"wallets",void 0);ze([x()],me.prototype,"recommended",void 0);ze([x()],me.prototype,"featured",void 0);ze([x()],me.prototype,"filteredWallets",void 0);me=ze([P("w3m-all-wallets-list")],me);const ko=ri`
  wui-grid,
  wui-loading-spinner,
  wui-flex {
    height: 360px;
  }

  wui-grid {
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;var _t=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let Le=class extends k{constructor(){super(...arguments),this.prevQuery="",this.prevBadge=void 0,this.loading=!0,this.query=""}render(){return this.onSearch(),this.loading?c`<wui-loading-spinner color="accent-primary"></wui-loading-spinner>`:this.walletsTemplate()}async onSearch(){(this.query.trim()!==this.prevQuery.trim()||this.badge!==this.prevBadge)&&(this.prevQuery=this.query,this.prevBadge=this.badge,this.loading=!0,await D.searchWallet({search:this.query,badge:this.badge}),this.loading=!1)}walletsTemplate(){const{search:t}=D.state,i=Fe.markWalletsAsInstalled(t);return t.length?c`
      <wui-grid
        data-testid="wallet-list"
        .padding=${["0","3","3","3"]}
        rowGap="4"
        columngap="2"
        justifyContent="space-between"
      >
        ${i.map(r=>c`
            <w3m-all-wallets-list-item
              @click=${()=>this.onConnectWallet(r)}
              .wallet=${r}
              data-testid="wallet-search-item-${r.id}"
            ></w3m-all-wallets-list-item>
          `)}
      </wui-grid>
    `:c`
        <wui-flex
          data-testid="no-wallet-found"
          justifyContent="center"
          alignItems="center"
          gap="3"
          flexDirection="column"
        >
          <wui-icon-box size="lg" color="default" icon="wallet"></wui-icon-box>
          <wui-text data-testid="no-wallet-found-text" color="secondary" variant="md-medium">
            No Wallet found
          </wui-text>
        </wui-flex>
      `}onConnectWallet(t){j.selectWalletConnector(t)}};Le.styles=ko;_t([x()],Le.prototype,"loading",void 0);_t([u()],Le.prototype,"query",void 0);_t([u()],Le.prototype,"badge",void 0);Le=_t([P("w3m-all-wallets-search")],Le);var mn=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let wt=class extends k{constructor(){super(...arguments),this.search="",this.badge=void 0,this.onDebouncedSearch=N.debounce(t=>{this.search=t})}render(){const t=this.search.length>=2;return c`
      <wui-flex .padding=${["1","3","3","3"]} gap="2" alignItems="center">
        <wui-search-bar @inputChange=${this.onInputChange.bind(this)}></wui-search-bar>
        <wui-certified-switch
          ?checked=${this.badge==="certified"}
          @certifiedSwitchChange=${this.onCertifiedSwitchChange.bind(this)}
          data-testid="wui-certified-switch"
        ></wui-certified-switch>
        ${this.qrButtonTemplate()}
      </wui-flex>
      ${t||this.badge?c`<w3m-all-wallets-search
            query=${this.search}
            .badge=${this.badge}
          ></w3m-all-wallets-search>`:c`<w3m-all-wallets-list .badge=${this.badge}></w3m-all-wallets-list>`}
    `}onInputChange(t){this.onDebouncedSearch(t.detail)}onCertifiedSwitchChange(t){t.detail?(this.badge="certified",Ve.showSvg("Only WalletConnect certified",{icon:"walletConnectBrown",iconColor:"accent-100"})):this.badge=void 0}qrButtonTemplate(){return N.isMobile()?c`
        <wui-icon-box
          size="xl"
          iconSize="xl"
          color="accent-primary"
          icon="qrCode"
          border
          borderColor="wui-accent-glass-010"
          @click=${this.onWalletConnectQr.bind(this)}
        ></wui-icon-box>
      `:null}onWalletConnectQr(){U.push("ConnectingWalletConnect")}};mn([x()],wt.prototype,"search",void 0);mn([x()],wt.prototype,"badge",void 0);wt=mn([P("w3m-all-wallets-view")],wt);const zo=M`
  :host {
    width: 100%;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${({spacing:e})=>e[3]};
    width: 100%;
    background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    border-radius: ${({borderRadius:e})=>e[4]};
    transition:
      background-color ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      scale ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color, scale;
  }

  wui-text {
    text-transform: capitalize;
  }

  wui-image {
    color: ${({tokens:e})=>e.theme.textPrimary};
  }

  @media (hover: hover) {
    button:hover:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    }
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;var re=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let Q=class extends k{constructor(){super(...arguments),this.imageSrc="google",this.loading=!1,this.disabled=!1,this.rightIcon=!0,this.rounded=!1,this.fullSize=!1}render(){return this.dataset.rounded=this.rounded?"true":"false",c`
      <button
        ?disabled=${this.loading?!0:!!this.disabled}
        data-loading=${this.loading}
        tabindex=${A(this.tabIdx)}
      >
        <wui-flex gap="2" alignItems="center">
          ${this.templateLeftIcon()}
          <wui-flex gap="1">
            <slot></slot>
          </wui-flex>
        </wui-flex>
        ${this.templateRightIcon()}
      </button>
    `}templateLeftIcon(){return this.icon?c`<wui-image
        icon=${this.icon}
        iconColor=${A(this.iconColor)}
        ?boxed=${!0}
        ?rounded=${this.rounded}
      ></wui-image>`:c`<wui-image
      ?boxed=${!0}
      ?rounded=${this.rounded}
      ?fullSize=${this.fullSize}
      src=${this.imageSrc}
    ></wui-image>`}templateRightIcon(){return this.rightIcon?this.loading?c`<wui-loading-spinner size="md" color="accent-primary"></wui-loading-spinner>`:c`<wui-icon name="chevronRight" size="lg" color="default"></wui-icon>`:null}};Q.styles=[F,oe,zo];re([u()],Q.prototype,"imageSrc",void 0);re([u()],Q.prototype,"icon",void 0);re([u()],Q.prototype,"iconColor",void 0);re([u({type:Boolean})],Q.prototype,"loading",void 0);re([u()],Q.prototype,"tabIdx",void 0);re([u({type:Boolean})],Q.prototype,"disabled",void 0);re([u({type:Boolean})],Q.prototype,"rightIcon",void 0);re([u({type:Boolean})],Q.prototype,"rounded",void 0);re([u({type:Boolean})],Q.prototype,"fullSize",void 0);Q=re([P("wui-list-item")],Q);var Do=function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let ti=class extends k{constructor(){super(...arguments),this.wallet=U.state.data?.wallet}render(){if(!this.wallet)throw new Error("w3m-downloads-view");return c`
      <wui-flex gap="2" flexDirection="column" .padding=${["3","3","4","3"]}>
        ${this.chromeTemplate()} ${this.iosTemplate()} ${this.androidTemplate()}
        ${this.homepageTemplate()}
      </wui-flex>
    `}chromeTemplate(){return this.wallet?.chrome_store?c`<wui-list-item
      variant="icon"
      icon="chromeStore"
      iconVariant="square"
      @click=${this.onChromeStore.bind(this)}
      chevron
    >
      <wui-text variant="md-medium" color="primary">Chrome Extension</wui-text>
    </wui-list-item>`:null}iosTemplate(){return this.wallet?.app_store?c`<wui-list-item
      variant="icon"
      icon="appStore"
      iconVariant="square"
      @click=${this.onAppStore.bind(this)}
      chevron
    >
      <wui-text variant="md-medium" color="primary">iOS App</wui-text>
    </wui-list-item>`:null}androidTemplate(){return this.wallet?.play_store?c`<wui-list-item
      variant="icon"
      icon="playStore"
      iconVariant="square"
      @click=${this.onPlayStore.bind(this)}
      chevron
    >
      <wui-text variant="md-medium" color="primary">Android App</wui-text>
    </wui-list-item>`:null}homepageTemplate(){return this.wallet?.homepage?c`
      <wui-list-item
        variant="icon"
        icon="browser"
        iconVariant="square-blue"
        @click=${this.onHomePage.bind(this)}
        chevron
      >
        <wui-text variant="md-medium" color="primary">Website</wui-text>
      </wui-list-item>
    `:null}onChromeStore(){this.wallet?.chrome_store&&N.openHref(this.wallet.chrome_store,"_blank")}onAppStore(){this.wallet?.app_store&&N.openHref(this.wallet.app_store,"_blank")}onPlayStore(){this.wallet?.play_store&&N.openHref(this.wallet.play_store,"_blank")}onHomePage(){this.wallet?.homepage&&N.openHref(this.wallet.homepage,"_blank")}};ti=Do([P("w3m-downloads-view")],ti);export{wt as W3mAllWalletsView,ht as W3mConnectingWcBasicView,ti as W3mDownloadsView};
