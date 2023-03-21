import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "4urmwrnl",
  dataset: "production",
  apiVersion: "2021-10-21",
  useCdn: true,
  token:
    "skTsK8WIfdLwKAcwWxrF6TGsldoUSIZxD0sdLvlRoulQKeB1YaNA57NBpiKLTKpq0ATL0052riz4yOWop5WKIz036xDDHPkCMDx0weBCISGRrDwuFHU04ql4Oi92lOXawqx0YxLtk1xtBwtzh1u2IXjyZyNDWUytXE6oCXyCQv0mTuhCDeCQ",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
