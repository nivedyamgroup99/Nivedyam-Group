-- Nivedyam: remove the rain-water reservoir claims (not in the Corporate Profile).
-- Run once in Supabase → SQL Editor → New query → Run.
begin;

insert into public.site_settings (key, value) values
  ('about_hero_title', 'The people, the plant and the journey behind the brand.'),
  ('about_story_title', 'Built in Payyanur, one step at a time, since 2012.'),
  ('about_story_p1', 'Nivedyam was founded in 2012 in Payyanur by Rajeesh P. A BBA graduate, he spent four years as Accounts Head with Lazza, Skei and Uncle John in Ernakulam, then two years in production, before starting his own packaged drinking water business.'),
  ('about_story_p2', 'Through years of early losses and expansions in 2016, 2019, 2022 and 2026, Nivedyam has grown into the No. 2 packaged drinking water business in the Kannur–Kasaragod region, certified by FSSAI and by BIS under IS 14543.'),
  ('about_quote', 'To bring safe, quality drinking water to every community we serve.'),
  ('about_quote_name', 'Our mission'),
  ('about_quote_role', 'Nivedyam Group of Industries'),
  ('about_source_title', 'Made in our own plant in Kannur.'),
  ('about_source_body', 'Gangothri and Ifthaar are produced at our packaged drinking water unit in Kannur district, with production and storage facilities built up over several expansion stages. About 40 people run the plant across day and night shifts.'),
  ('about_source_image', '/images/plant.jpg'),
  ('home_details_title', 'Made in Kannur since 2012.'),
  ('home_details_body', 'Gangothri and Ifthaar are produced in our own plant in Kannur, purified through a multi-stage process and certified by FSSAI and by BIS under IS 14543. Our own fleet delivers to 80+ distributors across North Kerala every day.'),
  ('process_hero_title', 'From our plant to your table.')
on conflict (key) do update set value = excluded.value, updated_at = now();

delete from public.stats where page = 'about';
insert into public.stats (sort, page, value, label) values
  (1, 'about', '2012', 'Established in Payyanur'),
  (2, 'about', '80+', 'Distributors'),
  (3, 'about', 'No. 2', 'In Kannur & Kasaragod'),
  (4, 'about', '4', 'Districts in North Kerala');

delete from public.features where page in ('about_source', 'about_steps');
insert into public.features (sort, page, icon, title, body) values
  (1, 'about_source', 'check', 'FSSAI & BIS certified', 'to IS 14543 for packaged drinking water.'),
  (2, 'about_source', 'check', 'Our own delivery fleet', '10 BharatBenz trucks on the road every day.'),
  (3, 'about_source', 'check', 'Institutional supply', 'for Indian Railways and the Naval Academy.'),
  (1, 'about_steps', 'drop', 'Purified', 'Water is purified in our Kannur plant through a multi-stage process.'),
  (2, 'about_steps', 'drop', 'Quality assured', 'Produced to FSSAI and BIS standard IS 14543.'),
  (3, 'about_steps', 'drop', 'Bottled', 'Filled and sealed in 500 ml, 1 litre and 2 litre packs.'),
  (4, 'about_steps', 'drop', 'Dispatched', 'Our fleet of 10 trucks delivers to distributors every day.'),
  (5, 'about_steps', 'drop', 'Across North Kerala', '80+ distributors in Kannur, Kasaragod, Wayanad and up to Koyilandy.');

update public.features set body = 'Multi-stage purification and mineral levels kept within the required limits for TDS, calcium, magnesium and pH.' where page = 'about_values' and title = 'Pure';
update public.features set body = 'Carried by 80+ distributors and chosen by families, shops and offices across North Kerala.' where page = 'about_values' and title = 'Trusted';
update public.features set icon = 'check', title = 'Certified quality', body = 'Certified by FSSAI and by BIS under IS 14543 for packaged drinking water.' where page = 'home_features' and title = 'Protected source';
update public.features set icon = 'eye', title = 'Delivered by our own fleet', body = '10 trucks carry fresh stock to distributors across North Kerala every day.' where page = 'home_features' and title = 'Open to inspection';
update public.slides set title = 'Pure water, made in Kannur.', body = 'Purified in our own plant, certified by FSSAI and BIS, and delivered across North Kerala since 2012.', stat_value = '2012', stat_label = 'Serving since' where title ilike '%ten metres underground%';
update public.process_phases set name = 'Intake & storage', intro = 'Water is received into the raw water tank, given a first disinfection and allowed to settle before treatment begins.' where name = 'Source & storage';

commit;
