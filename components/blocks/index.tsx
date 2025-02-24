import { tinaField } from "tinacms/dist/react";
import { Page, PageBlocks } from "../../tina/__generated__/types";
import { Hero } from "./hero";
import { About } from "./about";
import { Features } from "./features";
import { Testimonial } from "./testimonial";
import { TranslationServices } from "./translation-services";
import { Gallery } from "./gallery";
import { ContactForm } from "./contact-form";

export const Blocks = (props: Omit<Page, "id" | "_sys" | "_values">) => {
  return (
    <>
      {props.blocks
        ? props.blocks.map(function (block, i) {
            return (
              <div key={i} data-tina-field={tinaField(block)}>
                <Block {...block} />
              </div>
            );
          })
        : null}
    </>
  );
};

const Block = (block: PageBlocks) => {
  switch (block.__typename) {
    case "PageBlocksHero":
      return <Hero data={block} />;
    case "PageBlocksAbout":
      return <About data={block} />;
    case "PageBlocksFeatures":
      return <Features data={block} />;
    case "PageBlocksTestimonial":
      return <Testimonial data={block} />;
    case "PageBlocksTranslation_services":
      return <TranslationServices data={block} />;
    case "PageBlocksGallery":
      return <Gallery data={block} />;
    case "PageBlocksContact_form":
      return <ContactForm data={block} />;
    default:
      return null;
  }
};
