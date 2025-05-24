import React from "react";
import "../../stylesheets/Landing.Home.Page.Component.Stylesheet.css";

const LandingHomePageTestimonialsComponent: React.FunctionComponent = () => {
  return (
    <>
      <h1 id="home-page-testimonials-component-heading">What users say</h1>
      <article
        className={String(
          "home-page-testimonials-component"
        ).toLocaleLowerCase()}
      >
        <div>
          <article className="testimonial_wrapper">
            <p>
              Linklist is a game-changer for anyone who loves to save and
              organize their favorite links. The user interface is clean and
              intuitive, making it easy to find what I need when I need it. I
              can't imagine going back to my old way of saving links which used
              to waste me alot of time and at the end i lost my links.
            </p>
            <div>
              <img
                src="/avatars/avatar-1.png"
                alt="Current Admin Avatar"
                id="current-admin-avatar-placeholder"
              />
              <div>
                <span>Kennedy Baker</span>
                <p>Data analyst</p>
              </div>
            </div>
          </article>
        </div>
        <div>
          <article className="testimonial_wrapper">
            <p>
              I am so glad I found Linklist! It's the perfect solution for
              keeping all my favorite links in one place. The ability to
              categorize and tag links makes it easy to find what I'm looking
              for, and the design is just beautiful and simple to be accessed
              and operated easily.
            </p>
            <div>
              <img
                src="/avatars/avatar-5.png"
                alt="Current Admin Avatar"
                id="current-admin-avatar-placeholder"
              />
              <div>
                <span>Maria Hilda</span>
                <p>Ui/Ux designer</p>
              </div>
            </div>
          </article>
        </div>
      </article>
    </>
  );
};

export default LandingHomePageTestimonialsComponent;
