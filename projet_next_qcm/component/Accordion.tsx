"use client"

import React, { useState, createContext, useContext, ReactNode } from "react";

interface AccordionContextProps {
  openIndex: number | null;
  setOpenIndex: (index: number | null) => void;
}

const AccordionContext = createContext<AccordionContextProps | undefined>(
  undefined
);

interface AccordionProps {
  children: ReactNode;
}

export const Accordion = ({ children }: AccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <AccordionContext.Provider value={{ openIndex, setOpenIndex }}>
      <div role="presentation" className="accordion">
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps {
  children: ReactNode;
  index: number;
}

export const AccordionItem = ({ children, index }: AccordionItemProps) => {
  return (
    <div className="accordion-item" role="region">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { index });
        }
        return child;
      })}
    </div>
  );
};

interface AccordionHeaderProps {
  children: ReactNode;
  index?: number;
}

export const AccordionHeader = ({ children, index }: AccordionHeaderProps) => {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error(
      "AccordionHeader must be used within an Accordion component"
    );
  }

  const { openIndex, setOpenIndex } = context;
  const isOpen = openIndex === index;

  const toggleAccordion = () => {
    setOpenIndex(isOpen ? null : index!);
  };

  return (
    <button
      role="button"
      aria-expanded={isOpen}
      aria-controls={`panel-${index}`}
      id={`header-${index}`}
      className={`accordion-header ${isOpen ? "open" : ""}`}
      onClick={toggleAccordion}
    >
      {children}
      <span aria-hidden="true">{isOpen ? "▲" : "▼"}</span>
    </button>
  );
};

interface AccordionPanelProps {
  children: ReactNode;
  index?: number;
}

export const AccordionPanel = ({ children, index }: AccordionPanelProps) => {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error(
      "AccordionPanel must be used within an Accordion component"
    );
  }

  const { openIndex } = context;
  const isOpen = openIndex === index;

  return (
    <div
      id={`panel-${index}`}
      role="region"
      aria-labelledby={`header-${index}`}
      hidden={!isOpen}
      className="accordion-panel"
    >
      {children}
    </div>
  );
};
