import classes from "./check-section.module.scss";

function CheckSection() {
  return (
    <section
      className={classes.root}
      style={{ backgroundImage: "url(/check-bg.png)" }}
    >
      <h2 className={classes.title}>“Your Luck, Secured by Code!”</h2>
    </section>
  );
}

export default CheckSection;
