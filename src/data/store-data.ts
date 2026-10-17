export type StoreCategory = {
  name: string;
  shopCategory: string;
  image: string;
  imageAlt: string;
};

export type StoreProduct = {
  id: string;
  name: string;
  brand: string;
  category: string;
  categorySlug: string;
  price: string;
  priceAmount: number;
  previousPrice?: string;
  rating: number;
  reviewCount: number;
  badge?: string;
  badgeStyle?: "sale" | "new";
  image: string;
  imageAlt: string;
};

const recognizedBrands: Record<string, string> = {
  Stylo: "Stylo",
  Shahzad: "Shahzad",
  "Faisal Sanitary": "Faisal Sanitary",
  Dolphin: "Dolphin",
  GMSA: "GMSA",
  Popular: "Popular",
  Victor: "Victor",
  Tarsil: "Tarsil",
  Duramax: "Duramax",
  RBS: "RBS",
  Faco: "Faco",
  "Super Rusia": "Super Rusia",
};

export const categories: StoreCategory[] = [
  { name: "Commodes & Flush Tanks", shopCategory: "commodes-flush-tanks", image: "/washroom-commode-stylo.jpg", imageAlt: "Commode and flush tank products" },
  { name: "Basins & Sinks", shopCategory: "basins-sinks", image: "/basin-ventie.avif", imageAlt: "Bathroom basins and sinks" },
  { name: "Taps, Showers & Wall Cocks", shopCategory: "taps-showers-wall-cocks", image: "/basin-mixer-tap-single.png", imageAlt: "Bathroom taps and shower fittings" },
  { name: "Cabinets", shopCategory: "cabinets", image: "/stylo-cabinet-brown.png", imageAlt: "Bathroom cabinet" },
  { name: "Water Motors", shopCategory: "water-motors", image: "/water-motor-shahzad.webp", imageAlt: "Water motor" },
  { name: "Manhole Covers", shopCategory: "manhole-covers", image: "/main-hole-cover-dolphin.webp", imageAlt: "Manhole cover" },
  { name: "Geyser Fittings, Pipes & Fittings", shopCategory: "geyser-pipes-fittings", image: "/geezer-fitting-materials.webp", imageAlt: "Geyser fittings and plumbing pipes" },
  { name: "Popular", shopCategory: "popular", image: "/popular-ppr-pipe-pn-20.webp", imageAlt: "Popular PPR pipe" },
  { name: "Hardware", shopCategory: "hardware", image: "/hammer-drill.png", imageAlt: "Hardware tools" },
];

export const shopCategories = [
  { name: "All", slug: "all" },
  { name: "Commodes & Flush Tanks", slug: "commodes-flush-tanks" },
  { name: "Basins & Sinks", slug: "basins-sinks" },
  { name: "Taps, Showers & Wall Cocks", slug: "taps-showers-wall-cocks" },
  { name: "Cabinets", slug: "cabinets" },
  { name: "Water Motors", slug: "water-motors" },
  { name: "Manhole Covers", slug: "manhole-covers" },
  { name: "Geyser Fittings, Pipes & Fittings", slug: "geyser-pipes-fittings" },
  { name: "Popular", slug: "popular" },
  { name: "Hardware", slug: "hardware" },
] as const;

function productCategory(
  id: string,
  category: string,
  categorySlug: string,
  brand: string,
): { category: string; categorySlug: string } {
  if (brand === "Popular" || brand === "Victor") {
    return { category: "Popular", categorySlug: "popular" };
  }
  if (categorySlug === "popular") {
    return { category: "Geyser Fittings, Pipes & Fittings", categorySlug: "geyser-pipes-fittings" };
  }
  if (categorySlug === "commodes" || categorySlug === "flush-tanks") {
    return { category: "Commodes & Flush Tanks", categorySlug: "commodes-flush-tanks" };
  }
  if (categorySlug === "basins" || categorySlug === "sinks") {
    return { category: "Basins & Sinks", categorySlug: "basins-sinks" };
  }
  if (categorySlug === "taps-showers" || categorySlug === "wall-cocks") {
    return { category: "Taps, Showers & Wall Cocks", categorySlug: "taps-showers-wall-cocks" };
  }
  if (categorySlug === "cabinets" || categorySlug === "water-motors" || categorySlug === "manhole-covers") {
    return { category, categorySlug };
  }
  if (categorySlug === "geyser-fittings" || categorySlug === "pipes-fittings") {
    return { category: "Geyser Fittings, Pipes & Fittings", categorySlug: "geyser-pipes-fittings" };
  }

  const accessoryCategories: Record<string, { category: string; categorySlug: string }> = {
    "super-rusia-sanitary": { category: "Taps, Showers & Wall Cocks", categorySlug: "taps-showers-wall-cocks" },
    "silicon-gmsa": { category: "Geyser Fittings, Pipes & Fittings", categorySlug: "geyser-pipes-fittings" },
    "elfi-gmsa": { category: "Geyser Fittings, Pipes & Fittings", categorySlug: "geyser-pipes-fittings" },
    "drainage-hole": { category: "Geyser Fittings, Pipes & Fittings", categorySlug: "geyser-pipes-fittings" },
    "water-filter": { category: "Geyser Fittings, Pipes & Fittings", categorySlug: "geyser-pipes-fittings" },
    "bathrroom-venties": { category: "Geyser Fittings, Pipes & Fittings", categorySlug: "geyser-pipes-fittings" },
    "dura-max-water-tanky": { category: "Geyser Fittings, Pipes & Fittings", categorySlug: "geyser-pipes-fittings" },
    "faisal-automatic-pump-controller": { category: "Water Motors", categorySlug: "water-motors" },
    "faisal-floar-switches": { category: "Water Motors", categorySlug: "water-motors" },
    "faisal-float-switches1": { category: "Water Motors", categorySlug: "water-motors" },
    "faisal-tissue-holder": { category: "Taps, Showers & Wall Cocks", categorySlug: "taps-showers-wall-cocks" },
    "faisal-towel-holder": { category: "Taps, Showers & Wall Cocks", categorySlug: "taps-showers-wall-cocks" },
    "fluidamper-diesel-performance": { category: "Hardware", categorySlug: "hardware" },
    "hand-dryer-washroom-faisal": { category: "Taps, Showers & Wall Cocks", categorySlug: "taps-showers-wall-cocks" },
    "ppe-ported-fuel-rail-fitting": { category: "Hardware", categorySlug: "hardware" },
    "rbs-ball-cock-silver": { category: "Geyser Fittings, Pipes & Fittings", categorySlug: "geyser-pipes-fittings" },
    "rbs-ball-cock": { category: "Geyser Fittings, Pipes & Fittings", categorySlug: "geyser-pipes-fittings" },
    "stylo-thimble": { category: "Geyser Fittings, Pipes & Fittings", categorySlug: "geyser-pipes-fittings" },
    "stylo-thimble2": { category: "Geyser Fittings, Pipes & Fittings", categorySlug: "geyser-pipes-fittings" },
    "tankguard-float-switch-water-level-controller": { category: "Water Motors", categorySlug: "water-motors" },
    "steel-claw-hammer": { category: "Hardware", categorySlug: "hardware" },
  };
  return accessoryCategories[id] ?? { category, categorySlug };
}

function createProduct(
  id: string,
  name: string,
  brand: string,
  category: string,
  categorySlug: string,
  image: string,
  priceAmount: number,
): StoreProduct {
  const productBrand = recognizedBrands[brand] ?? "";
  const productCategoryInfo = productCategory(id, category, categorySlug, brand);
  return {
    id,
    name,
    brand: productBrand,
    ...productCategoryInfo,
    price: `Rs. ${priceAmount.toLocaleString("en-PK")}`,
    priceAmount,
    rating: 4.8,
    reviewCount: 12,
    image,
    imageAlt: `${name}${productBrand ? ` by ${productBrand}` : ""}`,
  };
}

const existingProducts: StoreProduct[] = [
  createProduct("main-hole-cover-dolphin", "Manhole Cover", "Dolphin", "Manhole Covers", "manhole-covers", "/main-hole-cover-dolphin.webp", 4500),
  createProduct("flush-tanky-stylo", "Flush Tank", "Stylo", "Flush Tanks", "flush-tanks", "/flush-tanky-stylo.webp", 8500),
  createProduct("sink-stylo", "Sink", "Stylo", "Sinks", "sinks", "/sink-stylo.webp", 12000),
  createProduct("washroom-commode-stylo", "Commode", "Stylo", "Commodes", "commodes", "/washroom-commode-stylo.jpg", 28000),
  createProduct("basin-ventie", "Basin", "", "Basins", "basins", "/basin-ventie.avif", 9500),
  createProduct("basin-stand", "Basin Stand", "Unbranded", "Basins", "basins", "/basin-stand.webp", 6500),
  createProduct("water-motor-shahzad", "Water Motor", "Shahzad", "Water Motors", "water-motors", "/water-motor-shahzad.webp", 18500),
  createProduct("water-motor-shahzad2", "Water Motor", "Shahzad", "Water Motors", "water-motors", "/water-motor-shahzad2.webp", 22000),
  createProduct("water-motors-shahzad", "Water Motor", "Shahzad", "Water Motors", "water-motors", "/water-motors-shahzad.webp", 26000),
  createProduct("faisal-sanitary-taps", "Taps", "Faisal Sanitary", "Taps & Showers", "taps-showers", "/faisal-sanitary-taps.png", 3500),
  createProduct("faisal-sanitary-taps1", "Taps", "Faisal Sanitary", "Taps & Showers", "taps-showers", "/faisal-sanitrary-taps1.png", 4200),
  createProduct("super-rusia-sanitary", "Sanitary Item", "Super Rusia", "Other Accessories", "other-accessories", "/super-rusia-sanitary.webp", 5800),
  createProduct("muslim-shower-faco", "Muslim Shower", "Faco", "Taps & Showers", "taps-showers", "/muslim-shower-faco.jpg", 2400),
  createProduct("geezer-fitting-materials", "Geyser Fitting Materials", "Unbranded", "Geyser Fittings", "geyser-fittings", "/geezer-fitting-materials.webp", 3200),
  createProduct("silicon-gmsa", "Silicone", "GMSA", "Other Accessories", "other-accessories", "/silicon-gmsa.webp", 750),
  createProduct("elfi-gmsa", "Elfi", "GMSA", "Other Accessories", "other-accessories", "/elfi-gmsa.webp", 450),
  createProduct("white-big-pipes-popular", "White Big Pipes", "Popular", "Pipes & Fittings", "pipes-fittings", "/white-big-pipes-popular.webp", 1800),
  createProduct("green-pipes-popular", "Green Pipes", "Popular", "Pipes & Fittings", "pipes-fittings", "/green-pipes-popular.jpg", 1500),
  createProduct("white-big-pipes-fitting", "White Pipe Fittings", "Unbranded", "Pipes & Fittings", "pipes-fittings", "/white-big-pipes-fitting.webp", 650),
  createProduct("fitting-points", "Fitting Points", "Unbranded", "Pipes & Fittings", "pipes-fittings", "/fitting-points.jpg", 500),
  createProduct("newzel-fitting", "Nozzle Fitting", "Unbranded", "Pipes & Fittings", "pipes-fittings", "/newzel-fitting.webp", 350),
  createProduct("automatic-washing-machine-pipes", "Washing Machine Pipes", "Unbranded", "Pipes & Fittings", "pipes-fittings", "/automatic-washing-machine-pipes.webp", 1200),
  createProduct("drainage-hole", "Drainage Hole", "Unbranded", "Other Accessories", "other-accessories", "/drainage-hole.webp", 400),
  createProduct("solvent-cement", "Solvent Cement", "Unbranded", "Pipes & Fittings", "pipes-fittings", "/solvent-cement.webp", 550),
  createProduct("water-filter", "Water Filter", "Unbranded", "Other Accessories", "other-accessories", "/water-filter.webp", 9500),
  createProduct("2phase-kitchen-bowl-sink", "2 Phase Kitchen Bowl Sink", "Unbranded", "Sinks", "sinks", "/2phase-kitchen-bowl-sink.webp", 0),
  createProduct("dura-max-water-pipes-fitting-materials", "Water Pipes & Fitting Materials", "Duramax", "Pipes & Fittings", "pipes-fittings", "/Dura-Max-Water-Pipes-fitting-materials.webp", 0),
  createProduct("art-basin", "Art Basin", "Unbranded", "Basins", "basins", "/art-basin.avif", 0),
  createProduct("autmatic-washing-machine-pipe-2meters", "Washing Machine Pipe 2 Meters", "Unbranded", "Pipes & Fittings", "pipes-fittings", "/autmatic-washing-machine-pipe-2meters.jpg", 0),
  createProduct("automatic-washing-machine-pipe-1-5meter", "Washing Machine Pipe 1.5 Meters", "Unbranded", "Pipes & Fittings", "pipes-fittings", "/automatic-washing-machine-pipe-1.5meter.png", 0),
  createProduct("automatic-washing-machine-pipe-3meter", "Washing Machine Pipe 3 Meters", "Unbranded", "Pipes & Fittings", "pipes-fittings", "/automatic-washing-machine-pipe-3meter.png", 0),
  createProduct("automatic-washing-machine-pipe-5meter", "Washing Machine Pipe 5 Meters", "Unbranded", "Pipes & Fittings", "pipes-fittings", "/automatic-washing-machine-pipe-5meter.png", 0),
  createProduct("bathrroom-venties", "Bathroom Venties", "Unbranded", "Other Accessories", "other-accessories", "/bathrroom-venties.png", 0),
  createProduct("comode-white", "White Commode", "Unbranded", "Commodes", "commodes", "/comode-white.png", 0),
  createProduct("counter-basin", "Counter Basin", "Unbranded", "Basins", "basins", "/counter-basin.avif", 0),
  createProduct("dura-max-all-fitting-materials-available", "Pipe Fitting Materials", "Duramax", "Pipes & Fittings", "pipes-fittings", "/dura-max-all-fitting-materials-available.png", 0),
  createProduct("dura-max-big-pipes-fittting-materials", "Big Pipe Fitting Materials", "Duramax", "Pipes & Fittings", "pipes-fittings", "/dura-max-big-pipes-fittting-materials.png", 0),
  createProduct("dura-max-oil-galley-feed-fitting", "Oil Galley Feed Fitting", "Duramax", "Pipes & Fittings", "pipes-fittings", "/dura-max-oil-galley-feed-fitting.png", 0),
  createProduct("dura-max-water-tanky", "Water Tank", "Duramax", "Other Accessories", "other-accessories", "/dura-max-water-tanky.png", 0),
  createProduct("electric-motor-shahzad", "Electric Motor", "Shahzad", "Water Motors", "water-motors", "/electric-motor-shahzad.png", 0),
  createProduct("faisal-automatic-pump-controller", "Automatic Pump Controller", "Faisal Sanitary", "Other Accessories", "other-accessories", "/faisal-automatic-pump-controller.png", 0),
  createProduct("faisal-floar-switches", "Float Switch", "Faisal Sanitary", "Other Accessories", "other-accessories", "/faisal-floar-switches.jpg", 0),
  createProduct("faisal-float-switches1", "Float Switch", "Faisal Sanitary", "Other Accessories", "other-accessories", "/faisal-float-switches1.png", 0),
  createProduct("faisal-tissue-holder", "Tissue Holder", "Faisal Sanitary", "Other Accessories", "other-accessories", "/faisal-tissue-holder.png", 0),
  createProduct("faisal-towel-holder", "Towel Holder", "Faisal Sanitary", "Other Accessories", "other-accessories", "/faisal-towel-holder.png", 0),
  createProduct("faisal-water-motors", "Water Motor", "Faisal Sanitary", "Water Motors", "water-motors", "/faisal-water-motors.png", 0),
  createProduct("faisal-water-motors2", "Water Motor", "Faisal Sanitary", "Water Motors", "water-motors", "/faisal-water-motors2.png", 0),
  createProduct("faisal-water-pumps", "Water Pump", "Faisal Sanitary", "Water Motors", "water-motors", "/faisal-water-pumps.png", 0),
  createProduct("fluidamper-diesel-performance", "Diesel Performance Fluidamper", "", "Other Accessories", "other-accessories", "/fluidamper-diesel-performance.png", 0),
  createProduct("flush-pink", "Pink Flush Tank", "Unbranded", "Flush Tanks", "flush-tanks", "/flush-pink.jpg", 0),
  createProduct("grey-comode", "Grey Commode", "Unbranded", "Commodes", "commodes", "/grey-comode.webp", 0),
  createProduct("grey-flush", "Grey Flush Tank", "Unbranded", "Flush Tanks", "flush-tanks", "/grey-flush.png", 0),
  createProduct("hand-dryer-washroom-faisal", "Washroom Hand Dryer", "Faisal Sanitary", "Other Accessories", "other-accessories", "/hand-dryer-washroom-faisal.png", 0),
  createProduct("joints-of-white-big-pipes", "White Big Pipe Joints", "Unbranded", "Pipes & Fittings", "pipes-fittings", "/joints-of-white-big-pipes.jpg", 0),
  createProduct("muslim-shower-chain-faco", "Muslim Shower Chain", "Faco", "Taps & Showers", "taps-showers", "/muslim-shower-chain-faco.png", 0),
  createProduct("muslim-shower-chain", "Muslim Shower Chain", "Unbranded", "Taps & Showers", "taps-showers", "/muslim-shower-chain.png", 0),
  createProduct("muslim-shower-golden-chain", "Golden Muslim Shower Chain", "Unbranded", "Taps & Showers", "taps-showers", "/muslim-shower-golden-chain.png", 0),
  createProduct("muslim-shower-holder", "Muslim Shower Holder", "Unbranded", "Taps & Showers", "taps-showers", "/muslim-shower-holder.png", 0),
  createProduct("muslim-shower-pipe", "Muslim Shower Pipe", "Unbranded", "Taps & Showers", "taps-showers", "/muslim-shower-pipe.png", 0),
  createProduct("muslim-shower-set", "Muslim Shower Set", "Unbranded", "Taps & Showers", "taps-showers", "/muslim-shower-set.png", 0),
  createProduct("muslim-shower-set2", "Muslim Shower Set 2", "Unbranded", "Taps & Showers", "taps-showers", "/muslim-shower-set2.png", 0),
  createProduct("muslim-shower", "Muslim Shower", "Unbranded", "Taps & Showers", "taps-showers", "/muslim-shower.png", 0),
  createProduct("pedestal-basin", "Pedestal Basin", "Unbranded", "Basins", "basins", "/pedestal-basin.png", 0),
  createProduct("persian-basin", "Persian Basin", "Unbranded", "Basins", "basins", "/persian-basin.png", 0),
  createProduct("ppe-ported-fuel-rail-fitting", "Ported Fuel Rail Fitting", "", "Other Accessories", "other-accessories", "/ppe-ported-fuel-rail-fitting.jpg", 0),
  createProduct("pressure-booster-pump-shahzad", "Pressure Booster Pump", "Shahzad", "Water Motors", "water-motors", "/pressure-booster-pump-shahzad.png", 0),
  createProduct("purple-comode", "Purple Commode", "Unbranded", "Commodes", "commodes", "/purple-comode.png", 0),
  createProduct("rbs-ball-cock-silver", "Ball Cock Silver", "RBS", "Other Accessories", "other-accessories", "/rbs-ball-cock-silver.png", 0),
  createProduct("rbs-ball-cock", "Ball Cock", "RBS", "Other Accessories", "other-accessories", "/rbs-ball-cock.png", 0),
  createProduct("rbs-bath-shower", "Bath Shower", "RBS", "Taps & Showers", "taps-showers", "/rbs-bath-shower.png", 0),
  createProduct("rbs-bath-shower2", "Bath Shower 2", "RBS", "Taps & Showers", "taps-showers", "/rbs-bath-shower2.png", 0),
  createProduct("rbs-pressure-bath-shower", "Pressure Bath Shower", "RBS", "Taps & Showers", "taps-showers", "/rbs-pressure-bath-shower.png", 0),
  createProduct("rbs-taps1", "Taps", "RBS", "Taps & Showers", "taps-showers", "/rbs-taps1.png", 0),
  createProduct("rbs-wall-cock2", "Wall Cock", "RBS", "Wall Cocks", "wall-cocks", "/rbs-wall-cock2.jpg", 0),
  createProduct("round-sink2", "Round Sink", "Unbranded", "Sinks", "sinks", "/round-sink2.png", 0),
  createProduct("shahzad-water-motor7", "Water Motor", "Shahzad", "Water Motors", "water-motors", "/shahzad-water-motor7.png", 0),
  createProduct("silver-comode", "Silver Commode", "Unbranded", "Commodes", "commodes", "/silver-comode.jpg", 0),
  createProduct("sink-bowl", "Bowl Sink", "Unbranded", "Sinks", "sinks", "/sink-bowl.png", 0),
  createProduct("stylo-cabinet-brown", "Brown Cabinet", "Stylo", "Cabinets", "cabinets", "/stylo-cabinet-brown.png", 0),
  createProduct("stylo-cabinet-flower-design", "Flower Design Cabinet", "Stylo", "Cabinets", "cabinets", "/stylo-cabinet-flower-design.webp", 0),
  createProduct("stylo-cabinets-corner-brown", "Corner Cabinet Brown", "Stylo", "Cabinets", "cabinets", "/stylo-cabinets-corner-brown.png", 0),
  createProduct("stylo-cabinets-corner", "Corner Cabinet", "Stylo", "Cabinets", "cabinets", "/stylo-cabinets-corner.png", 0),
  createProduct("stylo-cabinets-transparent", "Transparent Cabinet", "Stylo", "Cabinets", "cabinets", "/stylo-cabinets-transparent.webp", 0),
  createProduct("stylo-cabinets-white-design", "White Design Cabinet", "Stylo", "Cabinets", "cabinets", "/stylo-cabinets-white-design.webp", 0),
  createProduct("stylo-cabinets-white", "White Cabinet", "Stylo", "Cabinets", "cabinets", "/stylo-cabinets-white.png", 0),
  createProduct("stylo-cabinets-wood-design", "Wood Design Cabinet", "Stylo", "Cabinets", "cabinets", "/stylo-cabinets-wood-design.png", 0),
  createProduct("stylo-commode-thimble", "Commode Thimble", "Stylo", "Commodes", "commodes", "/stylo-commode-thimble.png", 0),
  createProduct("stylo-flush-tanky", "Flush Tank", "Stylo", "Flush Tanks", "flush-tanks", "/stylo-flush-tanky.png", 0),
  createProduct("stylo-flush-tanky2", "Flush Tank 2", "Stylo", "Flush Tanks", "flush-tanks", "/stylo-flush-tanky2.png", 0),
  createProduct("stylo-flush-tanky3", "Flush Tank 3", "Stylo", "Flush Tanks", "flush-tanks", "/stylo-flush-tanky3.png", 0),
  createProduct("stylo-thimble", "Thimble", "Stylo", "Other Accessories", "other-accessories", "/stylo-thimble.webp", 0),
  createProduct("stylo-thimble2", "Thimble 2", "Stylo", "Other Accessories", "other-accessories", "/stylo-thimble2.png", 0),
  createProduct("tankguard-float-switch-water-level-controller", "Float Switch Water Level Controller", "", "Other Accessories", "other-accessories", "/tankguard-float-switch-water-level-controller.jpeg", 0),
  createProduct("wall-comode", "Wall Hung Commode", "Unbranded", "Commodes", "commodes", "/wall-comode.png", 0),
  createProduct("wash-basin", "Wash Basin", "Unbranded", "Basins", "basins", "/wash-basin.png", 0),
  createProduct("wash-basin2", "Wash Basin 2", "Unbranded", "Basins", "basins", "/wash-basin2.png", 0),
  createProduct("wash-basin4", "Wash Basin 4", "Unbranded", "Basins", "basins", "/wash-basin4.png", 0),
  createProduct("water-motor-shahzad4", "Water Motor", "Shahzad", "Water Motors", "water-motors", "/water-motor-shahzad4.png", 0),
  createProduct("water-motor-shahzad5", "Water Motor", "Shahzad", "Water Motors", "water-motors", "/water-motor-shahzad5.png", 0),
  createProduct("water-motor-shahzad6", "Water Motor", "Shahzad", "Water Motors", "water-motors", "/water-motor-shahzad6.png", 0),
  createProduct("water-motor-shehzad3", "Water Motor", "Shahzad", "Water Motors", "water-motors", "/water-motor-shehzad3.png", 0),
  createProduct("wazoo-basin", "Wazoo Basin", "Unbranded", "Basins", "basins", "/wazoo-basin.avif", 0),
  createProduct("white-comode", "White Commode", "Unbranded", "Commodes", "commodes", "/white-comode.png", 0),
  createProduct("wsah-basin3", "Wash Basin 3", "Unbranded", "Basins", "basins", "/wsah-basin3.png", 0),
  createProduct("steel-claw-hammer", "Steel Claw Hammer", "Unbranded", "Other Accessories", "other-accessories", "/steel-claw-hammer.png", 0),
  createProduct("upvc-sdr-fitting-materils", "UPVC SDR Fitting Materials", "Unbranded", "Pipes & Fittings", "pipes-fittings", "/upvc-sdr-fitting-materils.jpg", 0),
  createProduct("upvs-pipes-all-fitting", "UPVC Pipes & Fittings", "Unbranded", "Pipes & Fittings", "pipes-fittings", "/upvs-pipes-all-fitting.png", 0),
  createProduct("white-big-pipes-fitting-png", "White Big Pipe Fittings", "Unbranded", "Pipes & Fittings", "pipes-fittings", "/white-big-pipes-fitting.png", 0),
];

const additionalImageProducts: StoreProduct[] = [
  createProduct("basin-mixer-tap-single", "Basin Mixer Tap Single", "", "Taps, Showers & Wall Cocks", "taps-showers-wall-cocks", "/basin-mixer-tap-single.png", 0),
  createProduct("circiut-tester", "Circuit Tester", "", "Hardware", "hardware", "/circiut-tester.png", 0),
  createProduct("cotton-braided-rope", "Cotton Braided Rope", "", "Hardware", "hardware", "/cotton-braided-rope.jpg", 0),
  createProduct("curved-claw-hammer", "Curved Claw Hammer", "", "Hardware", "hardware", "/curved-claw-hammer.png", 0),
  createProduct("cutter-plas", "Diagonal Cutting Pliers", "", "Hardware", "hardware", "/cutter-plas.png", 0),
  createProduct("drainage-hole2", "Drainage Hole 2", "", "Geyser Fittings, Pipes & Fittings", "geyser-pipes-fittings", "/drainage-hole2.png", 0),
  createProduct("drainage-hole3", "Drainage Hole 3", "", "Geyser Fittings, Pipes & Fittings", "geyser-pipes-fittings", "/drainage-hole3.webp", 0),
  createProduct("drainage-hole5", "Drainage Hole 5", "", "Geyser Fittings, Pipes & Fittings", "geyser-pipes-fittings", "/drainage-hole5.png", 0),
  createProduct("drainage-hole6", "Drainage Hole 6", "", "Geyser Fittings, Pipes & Fittings", "geyser-pipes-fittings", "/drainage-hole6.png", 0),
  createProduct("drapper-float-cold-chisel", "Flat Cold Chisel", "", "Hardware", "hardware", "/drapper-float-cold-chisel.png", 0),
  createProduct("driange-hole7", "Drainage Hole 7", "", "Geyser Fittings, Pipes & Fittings", "geyser-pipes-fittings", "/driange-hole7.png", 0),
  createProduct("electric-tester-screw-driver", "Electric Tester Screwdriver", "", "Hardware", "hardware", "/electric-tester-screw-driver.webp", 0),
  createProduct("hammer-drill", "Hammer Drill", "", "Hardware", "hardware", "/hammer-drill.png", 0),
  createProduct("high-precision-industrial-drill-match", "High Precision Industrial Drill Machine", "", "Hardware", "hardware", "/high-precision-industrial-drill-match.avif", 0),
  createProduct("inch-tape", "Inch Tape Measure", "", "Hardware", "hardware", "/inch-tape.png", 0),
  createProduct("industrial-digital-multimeter", "Industrial Digital Multimeter", "", "Hardware", "hardware", "/industrial-digital-multimeter.jpg", 0),
  createProduct("industrial-plas", "Industrial Pliers", "", "Hardware", "hardware", "/industrial-plas.jpg", 0),
  createProduct("level-meter", "Level Meter", "", "Hardware", "hardware", "/level-meter.png", 0),
  createProduct("main-tester-140mm", "Main Tester 140mm", "", "Hardware", "hardware", "/main-tester-140mm.png", 0),
  createProduct("nose-plier-cutter-plas", "Long Nose Pliers", "", "Hardware", "hardware", "/nose-plier-cutter-plas.png", 0),
  createProduct("nylon-rope", "Nylon Rope", "", "Hardware", "hardware", "/nylon-rope.png", 0),
  createProduct("pencil-electric-tester-1-500v", "Pencil Electric Tester 1-500V", "", "Hardware", "hardware", "/pencil-electric-tester-1--500v.png", 0),
  createProduct("plas2", "Combination Pliers", "", "Hardware", "hardware", "/plas2.jpg", 0),
  createProduct("rms-digital-meter", "RMS Digital Meter", "", "Hardware", "hardware", "/rms-digital-meter.webp", 0),
  createProduct("single-level-gold-line-series-taps", "Single Level Gold Line Series Taps", "", "Taps, Showers & Wall Cocks", "taps-showers-wall-cocks", "/single-level-gold-line-series-taps.png", 0),
  createProduct("sink-mixer-ultra-tap", "Sink Mixer Ultra Tap", "", "Taps, Showers & Wall Cocks", "taps-showers-wall-cocks", "/sink-mixer-ultra-tap.webp", 0),
  createProduct("wood-chisel", "Wood Chisel", "", "Hardware", "hardware", "/wood-chisel.jpg", 0),
];

type PriceListEntry = {
  brand: string;
  name: string;
  price: number;
  image?: string;
};

const priceListEntries: PriceListEntry[] = [];

function addPriceRows(
  brand: string,
  item: string,
  rows: ReadonlyArray<readonly [string, number]>,
  image?: string,
) {
  for (const [size, price] of rows) {
    priceListEntries.push({
      brand,
      name: `${item} ${size}`,
      price,
      image,
    });
  }
}

const pprPipes = [
  ["20mm", [237, 324, 379]],
  ["25mm", [365, 477, 587]],
  ["32mm", [587, 796, 953]],
  ["40mm", [1033, 1204, 1484]],
  ["50mm", [1647, 1913, 2315]],
  ["63mm", [2593, 3142, 3653]],
  ["75mm", [3827, 4419]],
  ["90mm", [undefined, 6520]],
  ["110mm", [8185, 9310]],
] as const;
for (const [size, prices] of pprPipes) {
  for (const [index, pressure] of ["PN-16", "PN-20", "PN-25"].entries()) {
    const price = prices[index];
    if (price !== undefined) {
      addPriceRows("Popular", `PPR Pipe ${pressure}`, [[size, price]], `/popular-ppr-pipe-${pressure.toLowerCase()}.webp`);
    }
  }
}

const pprFittingNames = [
  "PPR Elbow 90 Degree",
  "PPR Elbow 45 Degree",
  "PPR Socket",
  "PPR Tee",
  "PPR Union",
  "PPR Metal Spindle",
  "PPR Metal Gate Valve",
  "PPR Over Cross",
  "PPR Pipe Clamp",
  "PPR Ball Cap",
  "PPR Threaded End Cap",
  "PPR Pipe Cross Over",
  "PPR Pipe Clamp With Nail",
  "PPR Ball Valve",
  "PPR Metal Full Bore Gate Valve",
] as const;
const pprFittingImages = [
  "popular-ppr-elbow-90",
  "popular-ppr-elbow-45",
  "popular-ppr-socket",
  "popular-ppr-tee",
  "popular-ppr-union",
  "popular-ppr-spindle-metal",
  "popular-ppr-gate-valve-metal",
  "popular-ppr-over-cross",
  "popular-ppr-pipe-clump",
  "popular-ppr-ball-cap",
  "popular-ppr-threaded-end-cap",
  "popular-ppr-pipe-cross-over",
  "popular-ppr-pipe-clump-with-nail",
  "popular-ppr-ball-valve",
  "popular-ppr-gate-valve-full-bore",
] as const;
const pprFittingPrices = [
  ["20mm", [0, 0, 0, 0, 0, 0, 0, 0, 0, 33.5, 0, 0, 0, 0, 0]],
  ["25mm", [54.5, 52.5, 38.5, 71.5, 289, 1028, 1357, 159.5, 35.5, 43, 43.5, 233, 45, 2243, 2182]],
  ["32mm", [93, 91, 64.5, 139, 381, 1288, 1824, 291, 44, 44, 62.5, 390, 47, 2833, 2507]],
  ["40mm", [160, 154, 111, 203, 781, 1559, 2826, 0, 53.5, 0, 109, 609, 0, 0, 0]],
  ["50mm", [361, 355, 256, 512, 1527, 4030, 5271, 0, 70, 0, 220, 0, 0, 0, 0]],
  ["63mm", [695, 667, 422, 825, 2793, 7678, 9325, 0, 72, 0, 489, 0, 0, 0, 0]],
  ["75mm", [1341, 1001, 506, 1613, 0, 5854, 11592, 0, 0, 0, 565, 0, 0, 0, 0]],
  ["90mm", [2333, 1706, 1120, 2718, 0, 7678, 13355, 0, 0, 0, 920, 0, 0, 0, 0]],
  ["110mm", [4797, 3144, 2266, 4437, 0, 0, 0, 0, 0, 0, 1547, 0, 0, 0, 0]],
] as const;
for (const [size, prices] of pprFittingPrices) {
  prices.forEach((price, index) => {
    if (price > 0) {
      addPriceRows(
        "Popular",
        pprFittingNames[index],
        [[size, price]],
        `/${pprFittingImages[index]}.webp`,
      );
    }
  });
}

addPriceRows("Popular", "PPR Reducing Elbow 25x32mm", [["", 158]], "/popular-ppr-elbow-90.webp");
addPriceRows("Popular", "PPR Reducing Elbow 40x25mm", [["", 171]], "/popular-ppr-elbow-90.webp");
addPriceRows("Popular", "PPR Reducing Elbow 40x32mm", [["", 253]], "/popular-ppr-elbow-90.webp");
addPriceRows("Popular", "PPR Reducing Elbow 50x40mm", [["", 339]], "/popular-ppr-elbow-90.webp");
addPriceRows("Popular", "PPR Spindle Cap Metal", [["", 126]], "/popular-ppr-spindle-metal.webp");
addPriceRows("Popular", "PPR Double Elbow Female 25x1/2in", [["", 747]], "/popular-ppr-elbow-90.webp");
const pprMixedFittings = [
  ["Elbow Female 25x1/2in", 325], ["Elbow Male 25x1/2in", 428],
  ["Socket Female 25x1/2in", 295], ["Socket Male 25x1/2in", 408],
  ["Tee Female 25x1/2in", 346], ["Tee Male 25x1/2in", 449],
  ["Elbow Female 25x3/4in", 372], ["Elbow Male 25x3/4in", 550],
  ["Socket Female 25x3/4in", 339], ["Socket Male 25x3/4in", 517],
  ["Tee Female 25x3/4in", 432], ["Tee Male 25x3/4in", 624],
  ["Elbow Female 25x1in", 672], ["Socket Female 25x1in", 596],
  ["Elbow Female 32x1/2in", 398], ["Elbow Male 32x1/2in", 535],
  ["Socket Female 32x1/2in", 428], ["Socket Male 32x1/2in", 525],
  ["Tee Female 32x1/2in", 464], ["Tee Male 32x1/2in", 560],
  ["Elbow Female 32x3/4in", 539], ["Elbow Male 32x3/4in", 626],
  ["Socket Female 32x3/4in", 502], ["Socket Male 32x3/4in", 579],
  ["Tee Female 32x3/4in", 562], ["Tee Male 32x3/4in", 726],
  ["Elbow Female 32x1in", 691], ["Elbow Male 32x1in", 824],
  ["Socket Female 32x1in", 637], ["Socket Male 32x1in", 751],
  ["Tee Female 32x1in", 705], ["Tee Male 32x1in", 855],
  ["Elbow Female 40x1in", 912], ["Socket Female 40x1in", 665],
  ["Elbow Female 40x1-1/4in", 1706], ["Elbow Male 40x1-1/4in", 2351],
  ["Socket Female 40x1-1/4in", 1634], ["Socket Male 40x1-1/4in", 2315],
  ["Tee Female 40x1-1/4in", 1835], ["Tee Male 40x1-1/4in", 2488],
  ["Elbow Female 50x1-1/2in", 2512], ["Elbow Male 50x1-1/2in", 2804],
  ["Socket Female 50x1-1/2in", 2335], ["Socket Male 50x1-1/2in", 2649],
  ["Tee Female 50x1-1/2in", 2618], ["Tee Male 50x1-1/2in", 3148],
  ["Elbow Female 63x2in", 4181], ["Elbow Male 63x2in", 4746],
  ["Socket Female 63x2in", 3745], ["Socket Male 63x2in", 4436],
  ["Tee Female 63x2in", 4299], ["Tee Male 63x2in", 5516],
  ["Elbow Female 75x2-1/2in", 8592], ["Socket Female 75x2-1/2in", 7636],
  ["Socket Male 75x2-1/2in", 9587], ["Tee Female 75x2-1/2in", 8886],
  ["Elbow Female 90x3in", 11533], ["Socket Female 90x3in", 10203],
  ["Socket Male 90x3in", 12932], ["Tee Female 90x3in", 12389],
  ["Tee Male 90x3in", 14886],
] as const;
for (const [name, price] of pprMixedFittings) {
  priceListEntries.push({
    brand: "Popular",
    name: `PPR ${name}`,
    price,
    image: "/popular-ppr-elbow-90.webp",
  });
}

const pprSocketReducing = [
  ["25-20", 0], ["32-20", 0], ["32-25 female", 86], ["32-25 male", 96],
  ["40-20", 0], ["40-25", 147], ["40-32 female", 143], ["40-32 male", 172],
  ["50-20", 0], ["50-25", 191], ["50-32", 210], ["50-40", 228],
  ["63-20", 327], ["63-25", 0], ["63-32", 360],
  ["63-40", 340], ["63-50", 406], ["75-25", 505], ["75-32", 513],
  ["75-40", 507], ["75-50", 565], ["75-63", 633], ["90-63", 886],
  ["90-75", 941], ["110-63", 1493], ["110-75", 1520], ["110-90", 1759],
] as const;
for (const [size, price] of pprSocketReducing) {
  if (price) priceListEntries.push({ brand: "Popular", name: `PPR Reducing Socket ${size}`, price, image: "/popular-ppr-socket.webp" });
}
const pprTeeReducing = [
  ["20-25-20", 0], ["25-20-25", 90], ["32-25-32", 145],
  ["32-25-20", 0], ["32-20-20", 0], ["40-20-40", 196],
  ["40-25-40", 246], ["40-32-40", 265], ["50-20-50", 0],
  ["50-25-50", 405], ["50-32-50", 469], ["50-40-50", 508],
  ["63-20-63", 0], ["63-25-63", 686], ["63-32-63", 734],
  ["63-40-63", 816], ["63-50-63", 915], ["75-40-75", 1069],
  ["75-50-75", 1200], ["75-63-75", 1386],
] as const;
for (const [size, price] of pprTeeReducing) {
  if (price) priceListEntries.push({ brand: "Popular", name: `PPR Reducing Tee ${size}`, price, image: "/popular-ppr-tee.webp" });
}

addPriceRows("Popular", "UPVC Class O Medium Pipe", [
  ["1-1/2in", 2260.7], ["2in", 2915.9], ["3in", 4811.3], ["4in", 7070.7],
  ["5in", 9627.8], ["6in", 14942.2], ["8in", 21864.7], ["10in", 25144.6],
  ["12in", 31704.4], ["14in", 40449.5],
]);
addPriceRows("Popular", "UPVC ASTM D-2241 SDR-32.5 Pipe", [
  ["2in", 3308.5], ["3in", 6675.5], ["4in", 10975.9], ["6in", 23730.2],
]);
addPriceRows("Popular", "UPVC ASTM D-2241 SDR-26 Pipe", [["2in", 3861]]);
addPriceRows("Popular", "UPVC ASTM D-2241 SDR-41 Pipe", [
  ["3in", 5044], ["4in", 8967.4], ["6in", 18865.6], ["8in", 31886.4],
  ["10in", 49684.7], ["12in", 68519.1],
]);
addPriceRows("Popular", "UPVC ASTM D-2241 SDR-64 Pipe", [
  ["4in", 6112.6], ["6in", 12459.2], ["8in", 21208.2],
  ["10in", 31886.4], ["12in", 45236.1],
]);

addPriceRows("Victor", "UPVC Sewerage Pipe S-40 White", [
  ["1-1/4in", 910], ["1-1/2in", 1214.2], ["2in", 1820], ["3in", 2670.2],
  ["4in", 3638.7], ["5in", 6671.6], ["6in", 8491.6],
]);
addPriceRows("Victor", "UPVC Sewerage Pipe S-60 White", [
  ["2in", 2067], ["3in", 3042], ["4in", 4251], ["5in", 7280], ["6in", 9711],
]);
addPriceRows("Victor", "UPVC Pipe Gray", [
  ["3/4in", 336], ["1in", 456], ["1-1/4in", 928.2], ["1-1/2in", 1199.9],
  ["1-3/4in", 1618.5], ["2in", 1797.9], ["3in", 2635.1], ["4in", 3832.4],
  ["5in", 7186.4], ["6in", 10059.4],
]);

addPriceRows("Popular", "UPVC Electric Conduit Pipe", [
  ["1/2in", 360], ["3/4in", 488], ["1in", 669], ["1-1/4in", 1222],
  ["1-1/2in", 1679.6], ["2in", 2518.1], ["3in", 3636.1], ["4in", 5034.9],
  ["5in", 9790.3],
]);

const highPressureFittings = [
  ["Reducing Socket 1/2x3/4in", [0, 0, 0, 77]],
  ["Reducing Socket 3/4x1in", [0, 0, 0, 125]],
  ["Reducing Socket 1x1-1/4in", [0, 0, 0, 164]],
  ["Reducing Socket 1x2in", [0, 0, 0, 236]],
  ["Reducing Socket 1-1/4x1-1/2in", [0, 0, 201, 231]],
  ["Reducing Socket 1-1/4x2in", [0, 0, 200, 263]],
  ["Reducing Socket 1-1/2x2in", [0, 0, 234, 291]],
  ["Reducing Socket 2x3in", [0, 334, 459, 645]],
  ["Reducing Socket 2x4in", [0, 506, 712, 0]],
  ["Reducing Socket 3x4in", [476, 652, 950, 1285]],
  ["Reducing Socket 3x5in", [870, 1156, 1586, 0]],
  ["Reducing Socket 4x5in", [876, 1289, 1803, 2348]],
  ["Reducing Socket 4x6in", [1294, 1826, 2098, 0]],
  ["Reducing Socket 5x6in", [1498, 2173, 3098, 3956]],
  ["Reducing Socket 6x7in", [2326, 3230, 4686, 5818]],
  ["Reducing Socket 6x8in", [3754, 5397, 8557, 9298]],
  ["Reducing Socket 7x8in", [3521, 4517, 6959, 8570]],
  ["Reducing Socket 8x10in", [6533, 8286, 12327, 20516]],
  ["Reducing Socket 10x12in", [10488, 14293, 23395, 36855]],
  ["End Plug 2in", [0, 0, 364, 355]],
  ["End Plug 3in", [518, 514, 830, 798]],
  ["End Plug 4in", [668, 1136, 1485, 1586]],
  ["End Plug 5in", [1279, 1767, 2300, 2685]],
  ["End Plug 6in", [1691, 2786, 3474, 4397]],
  ["End Plug 7in", [2610, 3908, 5183, 7293]],
  ["End Plug 8in", [3413, 5123, 7476, 8780]],
  ["End Plug 10in", [7343, 11747, 15392, 21703]],
  ["End Plug 12in", [11823, 19100, 21667, 35371]],
  ["End Plug 14in", [18139, 24155, 36855, 54240]],
] as const;
const pressureClasses = ["B-Class", "C-Class", "D-Class", "E-Class"] as const;
for (const [item, prices] of highPressureFittings) {
  prices.forEach((price, index) => {
    if (price > 0) {
      priceListEntries.push({
        brand: "Popular",
        name: `UPVC High Pressure ${item} ${pressureClasses[index]}`,
        price,
      });
    }
  });
}

const popularConduitFittings = [
  ["Socket 1/2in", 11.6], ["Socket 3/4in", 11.7], ["Socket 1in", 20],
  ["Socket 1-1/4in", 57], ["Socket 1-1/2in", 78], ["Socket 2in", 109],
  ["Socket 3in", 184], ["Socket 4in", 278], ["Socket 5in", 670],
  ["Bend 90/45 Degree 1/2in", 22.1], ["Bend 90/45 Degree 3/4in", 37],
  ["Bend 90/45 Degree 1in", 49], ["Bend 90/45 Degree 1-1/4in", 102],
  ["Bend 90/45 Degree 1-1/2in", 142], ["Bend 90/45 Degree 2in", 225],
  ["Bend 90/45 Degree 3in", 384], ["Bend 90/45 Degree 4in", 666],
  ["Bend 90/45 Degree 5in", 2040], ["Bend Injection Moulded 1/2in", 38.2],
  ["Bend Injection Moulded 3/4in", 65], ["Bend Long Radius 1/2in", 44],
  ["Bend Long Radius 3/4in", 59], ["Bend Long Radius 1-1/4in", 157],
  ["Bend Long Radius 1-1/2in", 225], ["Bend Long Radius 2in", 325],
  ["End Cap for Joint Box 1/2in", 18], ["End Cap for Joint Box 3/4in", 21],
  ["Elbow 1/2in", 16], ["Tee 1/2in", 19], ["Clip 1/2in", 22],
  ["Clip 3/4in", 27],
] as const;
for (const [name, price] of popularConduitFittings) {
  priceListEntries.push({ brand: "Popular", name: `UPVC Conduit ${name}`, price });
}
const conduitBoxes = [
  ["Wall Box Small", 106], ["Wall Box Large", 162],
  ["Wall Box Open Small", 89], ["Wall Box Open Large", 118],
  ["Wall Box Jointer", 12],
  ["Light Box 2.5in", 68], ["Light Box 3in Small", 101],
  ["Light Box 3in Large", 128], ["Light Box 3in Large With Color", 169],
  ["Light Box 4in Large", 162], ["Light Box Cover", 27.1],
  ["Fan Box Electric Proof 6in", 441],
  ["Joint Box Wall 3/4in 1-2 Way", 73],
  ["Joint Box Wall 3/4in 3-4 Way", 82],
  ["Joint Box Wall 1in 1-2 Way", 77],
  ["Joint Box Wall 1in 3-4 Way", 88],
  ["Joint Box Wall 1-1/4in", 227],
  ["Joint Box Wall 1-1/2in", 342],
  ["Joint Box Roof 3/4in 1-2 Way", 113],
  ["Joint Box Roof 3/4in 3-4 Way", 121],
  ["Joint Box Roof 1in 1-2 Way", 121],
  ["Joint Box Roof 1in 3-4 Way", 135],
  ["Joint Box Roof 1-1/4in", 318],
  ["Joint Box Roof 1-1/2in", 405],
] as const;
for (const [name, price] of conduitBoxes) {
  priceListEntries.push({ brand: "Popular", name: `UPVC Conduit ${name}`, price });
}

const pressurePipeClasses = [
  ["B (6 bar)", [
    ["3in", 6864, 769, 440], ["4in", 10348, 1450, 746],
    ["5in", 14482, 3335, 1102], ["6in", 19942, 5718, 1592],
    ["8in", 31759, 15391, 3256], ["10in", 48750, 43594, 7631],
    ["12in", 68237, 66156, 12311], ["14in", 81978, 146049, 23274],
  ]],
  ["C (9 bar)", [
    ["2in", 3848, 341, 177], ["2-1/2in", 5915, 663, 346],
    ["3in", 8268, 1057, 532], ["4in", 13741, 2443, 981],
    ["5in", 20683, 5417, 1727], ["6in", 29549, 10590, 2885],
    ["8in", 45786, 28078, 5284], ["10in", 70902, 62680, 11105],
    ["12in", 99697, 88294, 17446], ["14in", 119639, 186915, 29551],
  ]],
  ["D (12 bar)", [
    ["1-1/4in", 2496, 215, 110], ["1-1/2in", 3107, 279, 153],
    ["2in", 4875, 499, 235], ["2-1/2in", 7241, 1120, 458],
    ["3in", 10790, 2040, 703], ["4in", 18018, 3728, 1319],
    ["5in", 26897, 8580, 2743], ["6in", 38857, 18938, 3737],
    ["8in", 59384, 52114, 7559], ["10in", 92313, 76592, 15751],
    ["12in", 129532, 187199, 25434], ["14in", 156559, 227043, 36666],
  ]],
  ["E (15 bar)", [
    ["1/2in", 916.5, 84, 47], ["3/4in", 1339, 111, 59],
    ["1in", 1924, 165, 91], ["1-1/4in", 2951, 261, 145],
    ["1-1/2in", 3848, 339, 195], ["2in", 6058, 690, 341],
    ["2-1/2in", 9165, 1794, 674], ["3in", 13156, 2743, 1005],
    ["4in", 21723, 6265, 1769], ["5in", 32942, 12399, 2918],
    ["6in", 46982, 36300, 5338], ["8in", 72085, 61669, 10067],
    ["10in", 111514, 94202, 19134], ["12in", 158041, 222112, 32107],
    ["14in", 190528, 238263, 59437],
  ]],
] as const;
for (const [className, rows] of pressurePipeClasses) {
  for (const [size, pipePrice, bendPrice, socketPrice] of rows) {
    priceListEntries.push(
      { brand: "Popular", name: `UPVC Pressure Pipe Class ${className} ${size}`, price: pipePrice },
      { brand: "Popular", name: `UPVC Pressure Pipe Bend 90/45 Degree Class ${className} ${size}`, price: bendPrice },
      { brand: "Popular", name: `UPVC Pressure Pipe Socket Class ${className} ${size}`, price: socketPrice },
    );
  }
}

addPriceRows("Popular", "UPVC DIN-8062 S-Series Pipe", [
  ["63mm S-20", 3081], ["90mm S-20", 5720], ["90mm S-25", 4290],
  ["110mm S-25", 7007], ["110mm S-63", 5512], ["160mm S-25", 15158],
  ["160mm S-63", 8294],
]);
const bs1329Fittings = [
  ["Elbow 45 Degree", [["2in", 170], ["3in", 310], ["4in", 500], ["6in", 855]]],
  ["Elbow 90 Degree", [["2in", 200], ["3in", 380], ["4in", 690], ["6in", 1410]]],
  ["Plug Elbow", [["3in", 580], ["4in", 950], ["6in", 1775]]],
  ["Coupling", [["2in", 115], ["3in", 220], ["4in", 305], ["6in", 595]]],
  ["Tee", [["2in", 265], ["3in", 565], ["4in", 955], ["6in", 1930]]],
  ["Plug Tee", [["3in", 775], ["4in", 1120], ["6in", 2545]]],
  ["Yee", [["2in", 325], ["3in", 620], ["4in", 1120], ["6in", 2245]]],
  ["P-Trap", [["2in", 425], ["3in", 870], ["4in", 1240]]],
  ["End Cap", [["2in", 65], ["3in", 135], ["4in", 205], ["6in", 475]]],
  ["Clean Out", [["2in", 205], ["3in", 310], ["4in", 420], ["6in", 985]]],
  ["Vent Cowl", [["2in", 40], ["3in", 95], ["4in", 150]]],
  ["Cross Tee", [["4in", 950]]],
  ["Roof Drain", [["4in", 1265]]],
  ["Double Yee", [["4in", 1170]]],
  ["Boss Pipe Male/Female", [["4in", 740]]],
  ["Elbow Male/Female", [["4in", 580]]],
  ["Elbow 45 Degree Male/Female", [["4in", 445]]],
  ["Plug Socket", [["4in", 955]]],
  ["Patch Boss Connector", [["56x110mm", 115]]],
  ["Reducer Bush", [["56x63mm", 70], ["56x82mm", 135], ["56x90mm", 165], ["56x110mm", 225], ["63x82mm", 140], ["63x90mm", 165]]],
  ["Floor Trap", [["82x110mm", 1005], ["90x110mm", 1055], ["160x110mm", 2225]]],
  ["Patch Boss Connector", [["63x110mm", 140], ["160x110mm", 355]]],
  ["Reducer Plug Tee", [["160x110mm", 2330]]],
  ["Reducer Bush", [["56x43mm", 70], ["63x43mm", 85], ["63x110mm", 245], ["82x90mm", 140], ["82x110mm", 240], ["90x110mm", 265], ["160x110mm", 530]]],
  ["Socket Reducer", [["63x2in", 105], ["82x3in", 210], ["90x3in", 215], ["110x4in", 305], ["160x6in", 685]]],
] as const;
for (const [item, rows] of bs1329Fittings) {
  addPriceRows("Popular", `UPVC BSEN-1329 Fitting ${item}`, rows);
}
const bs1329AdditionalSizes = [
  ["Elbow 45 Degree", [["56mm", 125], ["82mm", 250]]],
  ["Elbow 90 Degree", [["56mm", 140], ["82mm", 300]]],
  ["Plug Elbow", [["82mm", 475]]],
  ["Coupling", [["56mm", 75], ["82mm", 180]]],
  ["Tee", [["56mm", 190], ["82mm", 470]]],
  ["Plug Tee", [["82mm", 655]]],
  ["Yee", [["56mm", 240], ["82mm", 505]]],
  ["P-Trap", [["82mm", 670]]],
  ["End Cap", [["56mm", 55], ["82mm", 105]]],
  ["Clean Out", [["56mm", 150], ["82mm", 260]]],
  ["Vent Cowl", [["56mm", 40], ["82mm", 70]]],
] as const;
for (const [item, rows] of bs1329AdditionalSizes) {
  addPriceRows("Popular", `UPVC BSEN-1329 Fitting ${item}`, rows);
}

addPriceRows("Popular", "UPVC BSEN-1329 BD/B Sewer Pipe", [
  ["56mm B-Series", 4212], ["63mm B-Series", 4875], ["82mm BD-Series", 6084],
  ["90mm BD-Series", 6812], ["110mm BD-Series", 8554], ["160mm BD-Series", 16367],
  ["160mm B-Series", 13364], ["200mm BD-Series", 25038], ["315mm BD-Series", 62153],
]);
const sch40Fittings = [
  ["Elbow 45 Degree", [["2in", 192], ["3in", 487], ["4in", 754], ["6in", 2245]]],
  ["Elbow 90 Degree", [["3/4in", 64], ["1in", 102], ["1-1/4in", 155], ["1-1/2in", 197], ["2in", 292], ["3in", 576], ["3in M/F", 428], ["4in", 925], ["4in M/F", 661], ["6in", 2644]]],
  ["Socket", [["3/4in", 45], ["1in", 69], ["1-1/4in", 97], ["1-1/2in", 120], ["2in", 164], ["3in", 397], ["4in", 541], ["6in", 1650]]],
  ["Tee", [["1in", 114], ["1-1/4in", 208], ["1-1/2in", 241], ["2in", 373], ["3in", 833], ["3in M/F", 601], ["4in", 1345], ["4in M/F", 908], ["6in", 3948]]],
  ["Yee", [["2in", 673], ["3in", 1070], ["4in", 1604], ["6in", 4577]]],
  ["Plug Elbow", [["3in", 906], ["3in M/F", 626], ["4in", 1361], ["4in M/F", 967]]],
  ["Plug Tee", [["3in", 1124], ["3in M/F", 803], ["4in", 1802], ["4in M/F", 1232]]],
  ["Plug Socket", [["3in", 806], ["4in", 1363]]],
  ["Plug Cap", [["3in", 242], ["4in", 309]]],
  ["End Cap", [["1-1/4in", 95], ["1-1/2in", 112], ["2in", 124], ["3in", 243], ["4in", 298], ["6in", 1330]]],
  ["Cross Tee", [["3in", 1515], ["4in", 2202]]],
  ["Clean Out", [["3in", 640], ["4in", 820]]],
  ["Clean Out Cap", [["3in", 240], ["4in", 332]]],
  ["Vent Cowl", [["2in", 150], ["3in", 195], ["4in", 256]]],
  ["Clip", [["2in", 64], ["3in", 112], ["4in", 177]]],
  ["Medium Gray Bend 90/45 Degree", [["3in", 514], ["4in", 848], ["6in", 3810], ["8in", 12643]]],
  ["Medium Gray Socket", [["3in", 233], ["4in", 353], ["6in", 1085], ["8in", 2326]]],
  ["Toptile", [["6in", 329]]],
  ["Reducing Yee", [["3x4in", 1412]]],
  ["Reducing Elbow", [["3x4in", 883]]],
  ["Reducing Plug Tee", [["3x4in", 1602]]],
  ["Reducing Bush", [["2x4in", 261], ["3x4in", 287], ["3x2in", 282], ["6x4in", 1323]]],
  ["Reducing Socket", [["2x4in", 449], ["3x4in", 519], ["3x2in", 421], ["6x4in", 1577]]],
  ["Reducing Tee", [["3x4in", 1048], ["3x2in", 720], ["4x2in", 1240]]],
  ["Floor Trap Without Toptile", [["5x3in", 1080], ["4x3x2x1-1/2in", 946], ["4x3x2in", 973]]],
  ["Floor Trap Shutter", [["3in", 185]]],
  ["P-Trap", [["3in", 1265], ["3in single", 646], ["4in", 1858], ["4in single", 1484]]],
] as const;
for (const [item, rows] of sch40Fittings) {
  addPriceRows("Popular", `UPVC SCH.40 Fitting ${item}`, rows);
}

addPriceRows("Popular", "Popular Cable Trunk Plain", [
  ["16x16mm, 3m", 447], ["16x25mm, 3m", 559], ["16x38mm, 3m", 737],
  ["25x25mm, 3m", 737], ["25x38mm, 3m", 1117], ["33x33mm, 3m", 1173],
  ["40x40mm, 3m", 1452], ["40x60mm, 3m", 2067], ["50x50mm, 3m", 1955],
  ["60x60mm, 3m", 2513], ["80x80mm, 3m", 4367], ["100x100mm, 3m", 6185],
], "/popular-cables.webp");
addPriceRows("Popular", "Popular Cable Trunk Slotted", [
  ["25x25mm, 2m", 580], ["40x40mm, 2m", 1146],
  ["40x60mm, 2m", 1620], ["60x60mm, 2m", 1976],
], "/popular-cables.webp");
addPriceRows("Victor", "Victor UPVC Cable Trunk", [
  ["16x16mm, 3m", 384], ["16x25mm, 3m", 477], ["16x38mm, 3m", 626],
  ["25x25mm, 3m", 626], ["25x38mm, 3m", 981], ["33x33mm, 3m", 1028],
  ["40x40mm, 3m", 1262], ["60x60mm, 3m", 2149], ["80x80mm, 3m", 3854],
  ["100x100mm, 3m", 5312],
], "/popular-cables.webp");
addPriceRows("Victor", "Victor UPVC Cable Trunk Economy", [
  ["16x25mm, 3m", 309], ["16x38mm, 3m", 368],
], "/popular-cables.webp");

addPriceRows("Popular", "PVC Solvent Cement Prime Red", [
  ["25 gram", 103], ["50 gram", 147], ["75 gram", 222], ["125 gram", 339],
  ["250 gram", 583], ["500 gram", 1019],
], "/popular-pvc-solvent-prime.webp");
addPriceRows("Popular", "PVC Solvent Cement Premium Tin", [
  ["250 gram", 583], ["500 gram", 1019],
], "/popular-pvc-solvent-premium.webp");

addPriceRows("Tarsil", "UPVC Sewerage Pipe S-60 White", [
  ["2in", 2386.8], ["3in", 3510], ["4in", 4914], ["5in", 7720.7], ["6in", 11229.4],
]);
const tarsilFittings = [
  ["Elbow 45 Degree 2in", 128], ["Elbow 45 Degree 3in", 307], ["Elbow 45 Degree 4in", 439],
  ["Elbow 90 Degree 2in", 182], ["Elbow 90 Degree 3in", 414], ["Elbow 90 Degree 4in", 691],
  ["Socket 2in", 99], ["Socket 3in", 228], ["Socket 4in", 328],
  ["Tee 2in", 254], ["Tee 3in", 587], ["Tee 4in", 888],
  ["Yee 2in", 639], ["Yee 3in", 1149],
  ["Plug Elbow 2in", 593], ["Plug Elbow 3in", 973],
  ["Plug Tee 2in", 796], ["Plug Tee 3in", 1239],
  ["P-Trap 3in", 646], ["P-Trap 4in", 1484],
  ["End Cap 2in", 80], ["End Cap 3in", 112], ["End Cap 4in", 191],
  ["Male Female Tee 3in", 601], ["Male Female Tee 4in", 908],
  ["Male Female Plug Tee 3in", 803], ["Male Female Plug Tee 4in", 1232],
  ["Male Female Elbow 3in", 428], ["Male Female Elbow 4in", 661],
  ["Male Female Plug Elbow 3in", 626], ["Male Female Plug Elbow 4in", 967],
  ["Reducing Elbow 3x4in", 546], ["Reducing Bush 3x4in", 218],
  ["Reducing Yee 3x4in", 828], ["Reducing Tee 3x4in", 753],
] as const;
for (const [name, price] of tarsilFittings) {
  priceListEntries.push({ brand: "Tarsil", name: `UPVC Sewerage Fitting ${name}`, price });
}

addPriceRows("Popular", "Popular Water Tank", [
  ["400 liter, 105 gal, 30in diameter x 42in high", 17760],
  ["600 liter, 159 gal, 34in diameter x 46in high", 23930],
  ["800 liter, 211 gal, 38in diameter x 50in high", 32820],
  ["1000 liter, 264 gal, 40in diameter x 54in high", 35900],
  ["1200 liter, 317 gal, 43in diameter x 57in high", 44360],
  ["2000 liter, 528 gal, 51in diameter x 67in high", 65940],
]);
addPriceRows("Popular", "Water Tank Bush Complete 1/2x3/4in", [["", 730]]);
addPriceRows("Popular", "Water Tank Bush Complete 3/4x1in", [["", 930]]);
addPriceRows("Popular", "Water Tank Bush Complete 1x1-1/4in", [["", 1710]]);
addPriceRows("Popular", "Water Tank Bush Complete 1-1/4x1-1/2in", [["", 2070]]);
addPriceRows("Popular", "Water Tank Cap", [["", 2120]]);

const metricCables = [
  ["1mm2 Solid", [5264, 133, 193, 252]],
  ["1.5mm2 Solid", [5527, 163, 251, 353]],
  ["1.5mm2 Stranded", [8046, 163, 316.22, 361]],
  ["2.5mm2 Solid", [9435, 254, 381, 504]],
  ["2.5mm2 Stranded", [12818, 266, 474.59, 523]],
  ["4mm2", [20304, 474.83, 738.54, 763]],
  ["6mm2", [30059, 696.66, 833, 1149]],
  ["10mm2", [50472, 1184.42, 1348, 1767]],
  ["16mm2", [79718, 1286, 2018, 2651]],
] as const;
for (const [size, rates] of metricCables) {
  rates.forEach((price, index) => {
    if (price > 0) {
      const core = index === 0 ? "1 core 90m coil" : `${index + 1} core per meter`;
      priceListEntries.push({
        brand: "Popular",
        name: `General Wiring Cable ${size} ${core}`,
        price,
        image: "/popular-cables.webp",
      });
    }
  });
}
addPriceRows("Popular", "General Wiring Imperial Cable 3/.029in", [
  ["1 Core, 90m Coil", 7074], ["2 Core, per Meter", 186.57],
], "/popular-cables.webp");
addPriceRows("Popular", "General Wiring Imperial Cable 7/.029in", [
  ["1 Core, 90m Coil", 15594], ["2 Core, per Meter", 378.47],
], "/popular-cables.webp");
addPriceRows("Popular", "Flexible Solar Cable 4mm2", [["1 Core, 90m Coil", 24218]], "/popular-cables.webp");
addPriceRows("Popular", "Flexible Solar Cable 6mm2", [["1 Core, 90m Coil", 35887]], "/popular-cables.webp");

addPriceRows("Popular", "Intercom Cable", [
  ["1 Pair, 90m Coil", 4706], ["2 Pair, 90m Coil", 9208],
  ["3 Pair, 90m Coil", 13765], ["4 Pair, 90m Coil", 18229],
  ["5 Pair, 90m Coil", 22879],
], "/popular-cables.webp");
addPriceRows("Popular", "Coaxial Cable RG-7 Copper Clad Steel", [["90m Coil", 10112.4]], "/popular-cables.webp");
addPriceRows("Popular", "Coaxial Cable RG-11 Copper Clad Steel", [["90m Coil", 20650]], "/popular-cables.webp");

const flexibleCables = [
  ["0.75mm2", [3328, 129.01, 167, 221]],
  ["1.25mm2", [6862, 176.53, 214, 286]],
  ["1.5mm2", [8265, 204, 285, 383]],
  ["2.5mm2", [9616, 273, 398, 531]],
  ["4mm2", [21880, 540.93, 612, 818]],
] as const;
for (const [size, rates] of flexibleCables) {
  rates.forEach((price, index) => {
    const core = index === 0 ? "1 core 90m coil" : `${index + 1} core per meter`;
    priceListEntries.push({
      brand: "Popular",
      name: `Flexible Cable ${size} ${core}`,
      price,
      image: "/popular-cables.webp",
    });
  });
}
addPriceRows("Popular", "UPVC ASTM D-2729 Sewer Pipe White", [
  ["2in", 2770.3], ["3in", 4154.8], ["4in", 5757.7], ["5in", 8746.4], ["6in", 11807.9],
]);
addPriceRows("Popular", "Garden Gas and Level Pipe Transparent", [["per kg", 829]]);
addPriceRows("Popular", "Garden Gas and Level Pipe Green Blue Red", [["per kg", 832]]);
addPriceRows("Popular", "Garden Gas and Level Pipe Yellow", [["per kg", 835]]);
addPriceRows("Victor", "Garden Gas and Level Pipe Transparent", [["per kg", 817]]);
addPriceRows("Victor", "Garden Gas and Level Pipe Green Blue Red", [["per kg", 820]]);
addPriceRows("Victor", "Garden Gas and Level Pipe Yellow", [["per kg", 823]]);

function priceListId(name: string, index: number): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `price-list-${index + 1}-${slug}`;
}

const priceListProducts = priceListEntries
  .filter((entry): entry is PriceListEntry & { image: string } => Boolean(entry.image))
  .map((entry, index) => {
  const product = createProduct(
    priceListId(entry.name, index),
    entry.name.trim(),
    entry.brand,
    "Popular",
    "popular",
    entry.image,
    entry.price,
  );
  return {
    ...product,
    price: `Rs. ${entry.price.toLocaleString("en-PK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`,
  };
  });

export const products: StoreProduct[] = [
  ...existingProducts,
  ...additionalImageProducts,
  ...priceListProducts,
];

export const brands = [
  "Stylo",
  "Shahzad",
  "Faisal Sanitary",
  "Dolphin",
  "GMSA",
  "Popular",
  "Victor",
  "Tarsil",
  "Duramax",
  "RBS",
  "Faco",
  "Super Rusia",
];

export const reviews = [
  {
    name: "Ahmed Raza",
    quote:
      "Excellent quality products and very professional service. Highly recommended!",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80",
  },
  {
    name: "Ayesha Khan",
    quote:
      "Fast delivery and original products. Will definitely shop again!",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80",
  },
  {
    name: "Bilal Ahmed",
    quote:
      "Good prices and amazing customer support. Highly satisfied!",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100&q=80",
  },
  {
    name: "Sara Malik",
    quote:
      "Beautiful designs and helpful staff. They made choosing fittings so easy.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80",
  },
  {
    name: "Usman Tariq",
    quote:
      "Everything arrived safely and exactly as described. Great value for money.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
  },
  {
    name: "Hira Shah",
    quote:
      "A lovely selection of quality products and excellent service from start to finish.",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=100&h=100&q=80",
  },
];
