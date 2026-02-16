import SectionHeader from "@/components/section-header/section-header";
import classes from "./styles/faq.module.scss";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PlusIcon from "@/components/icons/plus-icon";
import MinusIcon from "@/components/icons/minus-icon";
import { faqItemList } from "@/components/sections/faq/utils";

function Faq() {
  return (
    <section id="faq" className={classes.root}>
      <SectionHeader title="Your Lottery Questions, Answered Transparently." />
      <Accordion type="multiple" className={classes.accordion}>
        {faqItemList.map(({ question, answer }) => (
          <div key={question} className={classes.accordionItemWrapper}>
            <AccordionItem value={question} className={classes.accordionItem}>
              <AccordionTrigger
                toggleIcon={
                  <div
                    data-slot="accordion-toggle"
                    className={classes.accordionToggle}
                  >
                    <PlusIcon />
                    <MinusIcon />
                  </div>
                }
                className={classes.accordionTrigger}
              >
                {question}
              </AccordionTrigger>
              <AccordionContent className={classes.accordionContent}>
                {answer}
              </AccordionContent>
            </AccordionItem>
          </div>
        ))}
      </Accordion>
    </section>
  );
}

export default Faq;
