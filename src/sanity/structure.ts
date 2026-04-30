import type { StructureResolver } from "sanity/structure";

const SINGLETON_TYPES = new Set(["siteSettings", "homePage"]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Inhalt")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.listItem()
        .title("Startseite")
        .id("homePage")
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.divider(),
      S.listItem()
        .title("Leistungsseiten")
        .child(S.documentTypeList("servicePage").title("Leistungsseiten")),
      S.listItem()
        .title("Stadtseiten")
        .child(S.documentTypeList("locationPage").title("Stadtseiten")),
      S.listItem()
        .title("Service + Stadt Kombiseiten")
        .child(
          S.documentTypeList("serviceLocationPage").title("Kombiseiten"),
        ),
      S.divider(),
      S.listItem()
        .title("Portfolio / Referenzen")
        .child(S.documentTypeList("referenceObject").title("Referenzen")),
      S.listItem()
        .title("Team")
        .child(S.documentTypeList("teamMember").title("Team-Mitglieder")),
      S.divider(),
      S.listItem()
        .title("Ratgeber")
        .child(S.documentTypeList("guidePage").title("Ratgeber")),
      S.listItem()
        .title("Blog / News")
        .child(S.documentTypeList("blogPost").title("Blog")),
      S.listItem()
        .title("Tools / Rechner / Lead-Magneten")
        .child(S.documentTypeList("tool").title("Tools")),
    ]);

export { SINGLETON_TYPES };
