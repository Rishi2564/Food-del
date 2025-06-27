import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16" id="about">
        <SectionHeaders subHeader={"Our story"} mainHeader={"About us"} />

        <div className="text-gray-500 max-w-md mx-auto mt-4 flex-col gap-4">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
            nam voluptas autem repudiandae fugit in ipsam ab modi ducimus iste,
            voluptatibus voluptatum, distinctio architecto voluptatem porro qui
            et quos. Porro.
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
            nam voluptas autem repudiandae fugit in ipsam ab modi ducimus iste,
            voluptatibus voluptatum, distinctio architecto voluptatem porro qui
            et quos. Porro.
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
            nam voluptas autem repudiandae fugit in ipsam.
          </p>
        </div>
      </section>
      <section className="text-center my-8" id="contact">
        <SectionHeaders
          subHeader={"Don't hesitate"}
          mainHeader={"Get in touch"}
        />
        <div className="mt-8">
          <a
            className="text-4xl underline text-gray-500"
            href="tel:+919600289216"
          >
            +91 9600 289 216
          </a>
        </div>
      </section>
      
    </>
  );
}
