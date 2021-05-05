import "./index.css";
export const PageNotFound = () => {
  return (
    <section className="column w12 align-center">
      <h2 className="bold text-center text-primary">Oh no!</h2>
      <p className="text-center margin-t-8">
        We're usually a treasure chest of knowledge, but we Couldn't find what
        you'r looking for.
      </p>
      <button className="btn-pry-fil margin-t-16">Try again</button>
    </section>
  );
};
