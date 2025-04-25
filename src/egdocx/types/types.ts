// TYPES for CONTENTS extracted
type SectionContent =
    | { type: "paragraph"; content: string }
    | { type: "bullet"; content: string[] };

export type Section = {
    heading: string | undefined;
    content: SectionContent[];
};

export type Page = Section[];