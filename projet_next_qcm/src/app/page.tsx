"use client"

import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
} from "../../component/Accordion";

export default function Home() {
  return (
    <main className="home">
      <h1>Accessible Accordion</h1>
      <Accordion>
        <AccordionItem index={0}>
          <AccordionHeader>Section 1</AccordionHeader>
          <AccordionPanel>Contenu de la section 1</AccordionPanel>
        </AccordionItem>
        <AccordionItem index={1}>
          <AccordionHeader>Section 2</AccordionHeader>
          <AccordionPanel>Contenu de la section 2</AccordionPanel>
        </AccordionItem>
        <AccordionItem index={2}>
          <AccordionHeader>Section 3</AccordionHeader>
          <AccordionPanel>Contenu de la section 3</AccordionPanel>
        </AccordionItem>
      </Accordion>
    </main>
  );
}
