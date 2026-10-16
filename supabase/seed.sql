-- Starting content for the Nivedyam website.
-- Run AFTER schema.sql. Safe to run once on an empty database.
-- IMPORTANT: change the email on the last line to your own Google account.

insert into public.site_settings (key, value) values
  ('brand_name', 'Nivedyam'),
  ('company_name', 'Nivedyam Group of Industries'),
  ('logo_url', ''),
  ('phone', '8129 777 222'),
  ('whatsapp', '8129 555 222'),
  ('email', 'nivedyamgroup777222@gmail.com'),
  ('address', 'XIII/26D, Thavidissery, Chooral, Aravanchal (PO), Payyannur, Kannur (Dist), Kerala 670353'),
  ('maps_url', 'https://www.google.com/maps/search/?api=1&query=Nivedyam+Group+of+Industries+Thavidissery+Aravanchal+Payyanur+Kerala+670353'),
  ('hours', '[Days and hours, e.g. Mon – Sat, 9:00 am – 6:00 pm]'),
  ('footer_blurb', 'Makers of Gangothri and Ifthaar drinking water. Bottled in Kannur, Kerala, without a human hand touching the water.'),
  ('home_details_eyebrow', 'Why Nivedyam'),
  ('home_details_title', 'Water begins ten metres underground.'),
  ('home_details_body', 'Our water is collected in a granite-lined monsoon reservoir ten metres below ground, sealed under a glass roof. From there it passes through 14 stages of filtration and is bottled without a human hand ever touching it.'),
  ('minerals_title', 'Gangothri mineral standards'),
  ('minerals_note', 'The mineral limits Gangothri is produced to meet.'),
  ('products_eyebrow', 'Our range'),
  ('products_title', 'Two brands, a size for every moment'),
  ('delivery_title', 'Home & office delivery, on your schedule'),
  ('delivery_body', 'Weekly or monthly plans for 20-litre jars and cases, through our 74 distributors across Kerala.'),
  ('about_hero_title', 'The reservoir, the land, and the people behind the brand.'),
  ('about_hero_body', 'From Thavidissery in Payyannur, Kannur, we bottle Gangothri and Ifthaar drinking water for homes, shops and offices across Kerala.'),
  ('about_hero_image', '/images/banner.jpg'),
  ('about_story_title', 'Water begins ten metres underground, sealed under glass.'),
  ('about_story_p1', '[How and when Nivedyam began: the founder''s name, the year, and why they chose to start a drinking-water company in Kannur. Two to three sentences.]'),
  ('about_story_p2', 'Today our water is gathered in a granite-lined monsoon reservoir, carried through fourteen stages of filtration, and bottled without a single human hand touching it.'),
  ('about_quote', 'From monsoon rain to sealed bottle, nothing touched by hand.'),
  ('about_quote_name', '[Founder / MD name]'),
  ('about_quote_role', '[Title], Nivedyam Group of Industries'),
  ('about_source_title', 'A reservoir you can see into.'),
  ('about_source_body', 'Monsoon rain is gathered in a granite-lined reservoir ten metres below ground. Its roof is made of glass, so the water can be checked through a viewing port without anyone stepping inside.'),
  ('process_hero_title', 'From monsoon rain to sealed bottle.'),
  ('process_hero_body', 'Every bottle of Gangothri passes through fourteen automated stages, from source to seal, without a single human hand touching the water.'),
  ('contact_hero_title', 'Let''s talk water.'),
  ('contact_hero_body', 'Orders, distribution enquiries, plant visits or a simple question. Message us on WhatsApp for the fastest response.'),
  ('distributor_title', 'Join our distributor network'),
  ('distributor_body', '74 distributors already carry Gangothri across Kerala. Tell us about your area and we''ll be in touch.'),
  ('distributor_count', '74')
on conflict (key) do nothing;

insert into public.slides (sort, eyebrow, title, body, cta_label, cta_link, image_url, bottle_brand, bottle_label, stat_value, stat_label) values
  (1, 'Pure. Safe. Trusted.', 'Hydrate the Right Way', 'Gangothri and Ifthaar drinking water from Nivedyam Group of Industries: 100% pure and safe, in every bottle.', 'Explore products', '/products', '/images/banner.jpg', '', '', '100%', 'Pure & safe'),
  (2, 'Gangothri · Ifthaar', 'Water begins ten metres underground.', 'Drawn from a granite-lined reservoir sealed under glass, filtered through 14 stages and bottled without a human touch.', 'Explore products', '/products', '/images/bottles.jpg', '', '', '14', 'Filtration stages'),
  (3, 'Gangothri purified water', 'From 300 ml to 2 litres.', 'A size for every table, from single servings to household bottles, and 20-litre jars for home and office.', 'See all sizes', '/products', '', 'gangothri', '1 Litre', '7,000 cases', 'Packed every day'),
  (4, 'Ifthaar packaged drinking water', 'Near you, across Kerala.', 'Our distributor network brings Gangothri and Ifthaar to shops, homes and offices throughout the state.', 'Find a distributor', '/contact', '', 'ifthaar', '', '74', 'Distributors');

insert into public.brands (sort, slug, name, description, label_color, cap_color) values
  (1, 'gangothri', 'Gangothri', 'Purified drinking water in 300 ml, 500 ml, 750 ml, 1 litre, 1.5 litre and 2 litre bottles, plus a 20-litre jar for homes and offices.', '#0E8A7B', '#1FA36B'),
  (2, 'ifthaar', 'Ifthaar', 'Packaged drinking water with purity in every drop. [Available sizes and where Ifthaar is sold.]', '#1E3FA8', '#2346B5');

insert into public.products (sort, featured, brand_slug, name, size, pack, tag, is_bulk, bottle_height) values
  (1, true, 'gangothri', 'Gangothri 500 ml', '500ml', 'Regular · case of [00]', 'Regular', false, 170),
  (2, true, 'gangothri', 'Gangothri 1 Litre', '1L', 'Family size · case of [00]', 'Family size', false, 195),
  (3, true, 'gangothri', 'Gangothri 2 Litre', '2L', 'Household · case of [00]', 'Jumbo', false, 210),
  (4, true, 'ifthaar', 'Ifthaar', '[SIZE]', 'Case of [00]', 'Ifthaar', false, 190),
  (5, false, 'gangothri', 'Gangothri 300 ml', '300ml', 'Single serving · case of [00]', 'Single serving', false, 150),
  (6, false, 'gangothri', 'Gangothri 750 ml', '750ml', 'Table size · case of [00]', 'Table size', false, 180),
  (7, false, 'gangothri', 'Gangothri 1.5 Litre', '1.5L', 'Case of [00]', 'Gangothri', false, 200),
  (8, false, 'gangothri', 'Gangothri 20 L jar', '20L', 'Refillable jar for home & office', 'Home & office', true, 210);

insert into public.stats (sort, page, value, label) values
  (1, 'home', '14', 'Filtration stages'),
  (2, 'home', '7,000', 'Cases packed daily'),
  (3, 'home', '74', 'Distributors across Kerala'),
  (1, 'about', '10 m', 'Reservoir depth underground'),
  (2, 'about', '14', 'Filtration stages, zero human contact'),
  (3, 'about', '7,000', 'Cases packed every day'),
  (4, 'about', '74', 'Distributors across Kerala'),
  (1, 'process', '14', 'Automated stages'),
  (2, 'process', '0', 'Human contact with the water'),
  (3, 'process', '2', 'Lab checks: in-house and BIS-approved');

insert into public.features (sort, page, icon, title, body) values
  (1, 'home_features', 'mountain', 'Protected source', 'A granite-lined monsoon reservoir, ten metres below ground and sealed under glass.'),
  (2, 'home_features', 'filter', '14-stage filtration', 'Every drop passes through fourteen filtration stages before a bottle is filled.'),
  (3, 'home_features', 'shield', 'Untouched by hand', 'Bottling is fully automated, so no human hand touches the water.'),
  (4, 'home_features', 'eye', 'Open to inspection', 'A viewing port in the glass roof lets the reservoir be checked without anyone entering it.'),
  (1, 'about_source', 'check', 'Sealed from the surface', 'protected deep underground.'),
  (2, 'about_source', 'check', 'Inspected without contact', 'through the glass viewing port.'),
  (3, 'about_source', 'check', 'Lined with granite', 'a natural, stable stone.'),
  (1, 'about_steps', 'drop', 'Monsoon rain', 'Rainwater from the monsoon is collected at our site in Kannur.'),
  (2, 'about_steps', 'drop', 'Underground reservoir', 'Stored ten metres below ground in a granite-lined tank with a glass roof.'),
  (3, 'about_steps', 'drop', '14-stage filtration', 'The water passes through fourteen stages of filtration and purification.'),
  (4, 'about_steps', 'drop', 'Touch-free bottling', 'Automated lines fill and seal every bottle with no human contact.'),
  (5, 'about_steps', 'drop', 'Across Kerala', '7,000 cases a day reach customers through 74 distributors.'),
  (1, 'about_values', 'drop', 'Pure', 'Fourteen stages of filtration and mineral levels kept within the required limits for TDS, calcium, magnesium and pH.'),
  (2, 'about_values', 'shield', 'Safe', 'Automated bottling means the water reaches the sealed bottle without any human contact.'),
  (3, 'about_values', 'thumb', 'Trusted', 'Carried by 74 distributors and chosen by families, shops and offices throughout Kerala.');

insert into public.minerals (sort, label, range, unit, note, highlight) values
  (1, 'TDS (Total Dissolved Solids)', '75 – 500', 'mg/L', 'A minimum of 75 mg/L is now mandatory', true),
  (2, 'Calcium (as Ca)', '10 – 75', 'mg/L', '', false),
  (3, 'Magnesium (as Mg)', '5 – 30', 'mg/L', '', false),
  (4, 'pH level', '6.5 – 8.5', '', 'Neutral, balanced water', false);

insert into public.process_phases (sort, name, intro, color, ink, tint) values
  (1, 'Source & storage', 'Water is collected from a protected source, given a first disinfection and allowed to settle before treatment begins.', '#0B7568', '#FFFFFF', '#E6F3F0'),
  (2, 'Filtration', 'Sand, carbon and cartridge filters remove sediment, chlorine, odour and colour, step by step.', '#2346B5', '#FFFFFF', '#E8EDFA'),
  (3, 'Purification & sterilisation', 'Membranes, fine filters, ultraviolet light and ozone deal with bacteria, viruses and spores.', '#0F1E5A', '#FFFFFF', '#DDE3F5'),
  (4, 'Fill & quality', 'Bottles are rinsed, filled and capped by machine, tested, then sealed and packed for distribution.', '#F4B942', '#0F1E5A', '#FFF4DC');

insert into public.process_steps (sort, phase_sort, title, short, body, spec) values
  (1, 1, 'Raw water harvesting', 'Harvesting', 'Water is drawn from our protected source and screened to remove leaves, dust and other debris.', ''),
  (2, 1, 'Chlorine doser', 'Chlorine', 'A measured dose of sodium hypochlorite gives the water its first line of disinfection.', '3–5 ppm'),
  (3, 1, 'Raw water tank', 'Raw tank', 'The water rests in primary storage so that suspended particles can settle before treatment.', ''),
  (4, 2, 'Pressure sand filter', 'Sand filter', 'Removes suspended matter and improves clarity. The filter cleans itself with an automatic back-wash.', 'Auto back-wash'),
  (5, 2, 'Activated carbon filter', 'Carbon', 'Takes out the remaining chlorine along with odour, colour and trace organic compounds.', ''),
  (6, 2, 'Pre-micron filters', 'Pre-micron', 'Cartridge filters trap finer sediment and parasite eggs that earlier stages let through.', '10 µm · 5 µm'),
  (7, 3, 'High pressure pump', 'HP pump', 'Pushes the pre-filtered water into the reverse osmosis system at a carefully controlled pressure.', 'RO feed'),
  (8, 3, 'Ultra filtration', 'Ultra filter', 'A fine membrane holds back bacteria and most viruses.', 'Membrane'),
  (9, 3, 'Post-micron filters', 'Post-micron', 'An even finer cartridge removes viruses, bacterial cells and mould spores.', '0.5 µm'),
  (10, 3, 'UV steriliser', 'UV', 'Ultraviolet lamps neutralise any bacteria that remain in the water.', 'UV light'),
  (11, 3, 'Ozonator', 'Ozone', 'Ozone treatment gives a final disinfection, reacting far faster than chemical methods.', '~3,200× faster'),
  (12, 4, 'Filling section', 'Filling', 'Machines rinse, fill and cap every bottle and jar automatically.', 'Fully automatic'),
  (13, 4, 'QC lab', 'QC lab', 'Each batch is tested in our own laboratory and checked by a BIS-approved external lab before release.', 'BIS-approved'),
  (14, 4, 'Finished product', 'Sealed', 'Sealed bottles move along automatic conveyors to be packed and sent out for distribution.', 'Ready to ship');

insert into public.faqs (sort, question, answer) values
  (1, 'What sizes are available?', 'Gangothri comes in 300 ml, 500 ml, 750 ml, 1 litre, 1.5 litre and 2 litre bottles, plus a 20-litre jar for homes and offices.'),
  (2, 'How can I contact customer support?', 'Email nivedyamgroup777222@gmail.com or call 8129 777 222. For the quickest reply, message us on WhatsApp at 8129 555 222.'),
  (3, 'What is your return policy?', 'Unopened products in their original packaging can be returned within 30 days with proof of purchase. Refunds are processed within 5–7 business days.'),
  (4, 'Where is your plant?', 'Our plant is at XIII/26D, Thavidissery, Chooral, Aravanchal (PO), Payyannur, Kannur, Kerala 670353. Use the Google Maps link above for directions.');

insert into public.reviews (sort, name, text, rating) values
  (1, 'Sneha Chandran Pk', 'A trusted brand with consistent quality, exceptional purity, and refreshing taste.', 5),
  (2, 'Raghuraj Poovatta', 'Nivedyam Group is the best mineral water company.', 5),
  (3, 'Mahesh VK', 'Trusted brand.', 5);

-- First owner. Replace with the Google email that should manage the site.
insert into public.admins (email, role) values ('gokulpp33@gmail.com', 'owner'), ('nivedyamgroup99@gmail.com', 'owner') on conflict (email) do nothing;
