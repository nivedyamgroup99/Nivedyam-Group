// Describes everything the admin panel can edit. Adding a field here adds it to the forms.
import { FEATURE_ICONS } from '@/components/icons';

export type FieldType = 'text' | 'textarea' | 'number' | 'boolean' | 'image' | 'color' | 'select' | 'brand' | 'phase' | 'icon';
export type Field = {
  name: string; label: string; type: FieldType; required?: boolean; help?: string;
  options?: { value: string; label: string }[]; placeholder?: string; min?: number; max?: number;
};
export type Collection = {
  key: string; table: string; label: string; singular: string; description: string;
  fields: Field[]; columns: string[]; groupBy?: string; orderable?: boolean; orderBy?: string;
};

const PAGES_STATS = [
  { value: 'home', label: 'Home page (next to minerals)' },
  { value: 'about', label: 'About page (numbers band)' },
  { value: 'process', label: 'Process page (header tiles)' },
];
const PAGES_FEATURES = [
  { value: 'home_features', label: 'Home: feature tiles' },
  { value: 'about_source', label: 'About: source checklist' },
  { value: 'about_steps', label: 'About: process summary steps' },
  { value: 'about_values', label: 'About: Pure / Safe / Trusted' },
];

export const COLLECTIONS: Collection[] = [
  {
    key: 'slides', table: 'slides', label: 'Home slider', singular: 'slide', orderable: true,
    description: 'The rotating banner at the top of the home page.',
    columns: ['title', 'eyebrow', 'published'],
    fields: [
      { name: 'title', label: 'Headline', type: 'text', required: true },
      { name: 'eyebrow', label: 'Small line above the headline', type: 'text' },
      { name: 'body', label: 'Text', type: 'textarea' },
      { name: 'cta_label', label: 'Button text', type: 'text', placeholder: 'Explore products' },
      { name: 'cta_link', label: 'Button link', type: 'text', placeholder: '/products', help: 'A page on this site, e.g. /products or /contact' },
      { name: 'image_url', label: 'Photo', type: 'image', help: 'Leave empty to show a drawn bottle instead.' },
      { name: 'bottle_brand', label: 'Drawn bottle brand (used when there is no photo)', type: 'brand' },
      { name: 'bottle_label', label: 'Text under the drawn bottle', type: 'text', placeholder: '1 Litre' },
      { name: 'stat_value', label: 'Badge number', type: 'text', placeholder: '14' },
      { name: 'stat_label', label: 'Badge label', type: 'text', placeholder: 'Filtration stages' },
      { name: 'published', label: 'Show this slide', type: 'boolean' },
    ],
  },
  {
    key: 'products', table: 'products', label: 'Products', singular: 'product', orderable: true,
    description: 'Bottles and jars shown on the home page and the products page.',
    columns: ['name', 'brand_slug', 'size', 'featured', 'published'],
    fields: [
      { name: 'name', label: 'Product name', type: 'text', required: true },
      { name: 'brand_slug', label: 'Brand', type: 'brand', required: true },
      { name: 'size', label: 'Size', type: 'text', placeholder: '500ml' },
      { name: 'pack', label: 'Pack / description', type: 'text', placeholder: 'Case of 24' },
      { name: 'tag', label: 'Tag on the card', type: 'text', placeholder: 'Bestseller' },
      { name: 'image_url', label: 'Product photo', type: 'image', help: 'Optional. Without a photo, a bottle is drawn in the brand colours.' },
      { name: 'bottle_height', label: 'Drawn bottle height (px)', type: 'number', min: 100, max: 230, help: 'Bigger bottles look taller: 150 small, 210 large.' },
      { name: 'is_bulk', label: 'Bulk item (shows under the “Bulk” filter)', type: 'boolean' },
      { name: 'featured', label: 'Show on the home page (first 4 are shown)', type: 'boolean' },
      { name: 'published', label: 'Show on the website', type: 'boolean' },
    ],
  },
  {
    key: 'brands', table: 'brands', label: 'Brands', singular: 'brand', orderable: true,
    description: 'Gangothri, Ifthaar… Their colours are used for bottles, cards and filters.',
    columns: ['name', 'slug', 'label_color'],
    fields: [
      { name: 'name', label: 'Brand name', type: 'text', required: true },
      { name: 'slug', label: 'Short ID', type: 'text', required: true, help: 'Lower-case, no spaces, e.g. gangothri. Don’t change it after products use it.' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'label_color', label: 'Label colour', type: 'color' },
      { name: 'cap_color', label: 'Cap colour', type: 'color' },
    ],
  },
  {
    key: 'stats', table: 'stats', label: 'Numbers & stats', singular: 'stat', orderable: true, groupBy: 'page',
    description: 'Highlighted figures like “14 filtration stages”.',
    columns: ['value', 'label', 'page'],
    fields: [
      { name: 'page', label: 'Where it appears', type: 'select', options: PAGES_STATS, required: true },
      { name: 'value', label: 'Number', type: 'text', required: true, placeholder: '7,000' },
      { name: 'label', label: 'Label', type: 'text', required: true },
    ],
  },
  {
    key: 'features', table: 'features', label: 'Feature cards', singular: 'card', orderable: true, groupBy: 'page',
    description: 'Icon cards on the home and about pages.',
    columns: ['title', 'page', 'icon'],
    fields: [
      { name: 'page', label: 'Where it appears', type: 'select', options: PAGES_FEATURES, required: true },
      { name: 'icon', label: 'Icon', type: 'icon' },
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'body', label: 'Text', type: 'textarea' },
    ],
  },
  {
    key: 'minerals', table: 'minerals', label: 'Mineral standards', singular: 'mineral', orderable: true,
    description: 'The mineral card on the home and process pages.',
    columns: ['label', 'range', 'unit'],
    fields: [
      { name: 'label', label: 'Name', type: 'text', required: true, placeholder: 'Calcium (as Ca)' },
      { name: 'range', label: 'Value or range', type: 'text', required: true, placeholder: '10 – 75' },
      { name: 'unit', label: 'Unit', type: 'text', placeholder: 'mg/L' },
      { name: 'note', label: 'Small note', type: 'text' },
      { name: 'highlight', label: 'Highlight (dark, full-width tile)', type: 'boolean' },
    ],
  },
  {
    key: 'process_phases', table: 'process_phases', label: 'Process phases', singular: 'phase', orderable: false, orderBy: 'sort',
    description: 'The 4 groups the 14 stages belong to.',
    columns: ['sort', 'name', 'color'],
    fields: [
      { name: 'sort', label: 'Phase number', type: 'number', required: true, min: 1, max: 20 },
      { name: 'name', label: 'Phase name', type: 'text', required: true },
      { name: 'intro', label: 'Introduction', type: 'textarea' },
      { name: 'color', label: 'Colour', type: 'color' },
      { name: 'ink', label: 'Text colour on that colour', type: 'color' },
      { name: 'tint', label: 'Light background tint', type: 'color' },
    ],
  },
  {
    key: 'process_steps', table: 'process_steps', label: 'Process stages', singular: 'stage', orderable: true,
    description: 'Each stage of the purification process, in order.',
    columns: ['title', 'phase_sort', 'spec'],
    fields: [
      { name: 'phase_sort', label: 'Phase', type: 'phase', required: true },
      { name: 'title', label: 'Stage name', type: 'text', required: true },
      { name: 'short', label: 'Short name (for the small tiles)', type: 'text' },
      { name: 'body', label: 'Description', type: 'textarea' },
      { name: 'spec', label: 'Key figure', type: 'text', placeholder: '3–5 ppm' },
    ],
  },
  {
    key: 'faqs', table: 'faqs', label: 'FAQs', singular: 'question', orderable: true,
    description: 'Questions and answers on the contact page.',
    columns: ['question'],
    fields: [
      { name: 'question', label: 'Question', type: 'text', required: true },
      { name: 'answer', label: 'Answer', type: 'textarea', required: true },
    ],
  },
  {
    key: 'reviews', table: 'reviews', label: 'Customer reviews', singular: 'review', orderable: true,
    description: 'Reviews on the about page.',
    columns: ['name', 'rating'],
    fields: [
      { name: 'name', label: 'Customer name', type: 'text', required: true },
      { name: 'text', label: 'Review', type: 'textarea', required: true },
      { name: 'rating', label: 'Stars (1–5)', type: 'number', min: 1, max: 5 },
    ],
  },
];

export const getCollection = (key: string) => COLLECTIONS.find((c) => c.key === key);

export const ICON_OPTIONS = FEATURE_ICONS.map((i) => ({ value: i, label: i }));

export type SettingField = { key: string; label: string; type: 'text' | 'textarea' | 'image'; help?: string };
export type SettingGroup = { id: string; title: string; description: string; fields: SettingField[] };

export const SETTING_GROUPS: SettingGroup[] = [
  {
    id: 'brand', title: 'Logo & footer', description: 'Name and logo in the header, and the short text in the footer.',
    fields: [
      { key: 'brand_name', label: 'Short name (header)', type: 'text' },
      { key: 'company_name', label: 'Full company name', type: 'text' },
      { key: 'logo_url', label: 'Logo', type: 'image', help: 'A light or white logo with a transparent background works best on the dark header. Leave empty to show the name.' },
      { key: 'footer_blurb', label: 'Footer text', type: 'textarea' },
    ],
  },
  {
    id: 'contact_details', title: 'Contact details', description: 'Used on every page: header button, footer and contact cards.',
    fields: [
      { key: 'phone', label: 'Phone (calls)', type: 'text', help: '10-digit Indian numbers get +91 added automatically.' },
      { key: 'whatsapp', label: 'WhatsApp number', type: 'text' },
      { key: 'email', label: 'Email', type: 'text' },
      { key: 'address', label: 'Address', type: 'textarea' },
      { key: 'maps_url', label: 'Google Maps link', type: 'text' },
      { key: 'hours', label: 'Working hours', type: 'text' },
    ],
  },
  {
    id: 'home_intro', title: 'Intro section', description: 'The text next to the mineral card, below the slider.',
    fields: [
      { key: 'home_details_eyebrow', label: 'Small heading', type: 'text' },
      { key: 'home_details_title', label: 'Headline', type: 'text' },
      { key: 'home_details_body', label: 'Text', type: 'textarea' },
    ],
  },
  {
    id: 'home_minerals', title: 'Mineral card', description: 'Title and note of the mineral card (also shown on the Process page).',
    fields: [
      { key: 'minerals_title', label: 'Card title', type: 'text' },
      { key: 'minerals_note', label: 'Note under the values', type: 'text' },
    ],
  },
  {
    id: 'home_delivery', title: 'Delivery band', description: 'The dark band near the bottom of the home page.',
    fields: [
      { key: 'delivery_title', label: 'Headline', type: 'text' },
      { key: 'delivery_body', label: 'Text', type: 'textarea' },
    ],
  },
  {
    id: 'products_heading', title: 'Section heading', description: 'Heading of the products section (home page and products page).',
    fields: [
      { key: 'products_eyebrow', label: 'Small heading', type: 'text' },
      { key: 'products_title', label: 'Headline', type: 'text' },
    ],
  },
  {
    id: 'about_header', title: 'Page header', description: 'The top of the About page.',
    fields: [
      { key: 'about_hero_title', label: 'Headline', type: 'text' },
      { key: 'about_hero_body', label: 'Intro text', type: 'textarea' },
      { key: 'about_hero_image', label: 'Wide photo under the header', type: 'image' },
    ],
  },
  {
    id: 'about_story', title: 'Story & quote', description: 'The “Our story” section and the quote card.',
    fields: [
      { key: 'about_story_title', label: 'Headline', type: 'text' },
      { key: 'about_story_p1', label: 'Paragraph 1', type: 'textarea' },
      { key: 'about_story_p2', label: 'Paragraph 2', type: 'textarea' },
      { key: 'about_quote', label: 'Quote', type: 'textarea' },
      { key: 'about_quote_name', label: 'Quote: name', type: 'text' },
      { key: 'about_quote_role', label: 'Quote: role', type: 'text' },
    ],
  },
  {
    id: 'about_source', title: 'Source section', description: 'The reservoir section with the diagram.',
    fields: [
      { key: 'about_source_title', label: 'Headline', type: 'text' },
      { key: 'about_source_body', label: 'Text', type: 'textarea' },
    ],
  },
  {
    id: 'process_header', title: 'Page header', description: 'The top of the Process page.',
    fields: [
      { key: 'process_hero_title', label: 'Headline', type: 'text' },
      { key: 'process_hero_body', label: 'Intro text', type: 'textarea' },
    ],
  },
  {
    id: 'contact_header', title: 'Page header', description: 'The top of the Contact page.',
    fields: [
      { key: 'contact_hero_title', label: 'Headline', type: 'text' },
      { key: 'contact_hero_body', label: 'Intro text', type: 'textarea' },
    ],
  },
  {
    id: 'contact_distributor', title: 'Distributor band', description: 'The blue “Join our distributor network” band.',
    fields: [
      { key: 'distributor_count', label: 'Big number', type: 'text' },
      { key: 'distributor_title', label: 'Headline', type: 'text' },
      { key: 'distributor_body', label: 'Text', type: 'textarea' },
    ],
  },
];

export const getSettingGroup = (id: string) => SETTING_GROUPS.find((g) => g.id === id);

// ---------------------------------------------------------------------------
// Admin "Pages": each website page with its own tabs.
// A tab shows one or more blocks: a text form (settings) or a list (collection).
// `scope` limits a list to rows for that page and fills it in for new rows.
// ---------------------------------------------------------------------------
export type Block =
  | { kind: 'settings'; group: string }
  | { kind: 'collection'; key: string; scope?: string; title?: string; note?: string };
export type PageTab = { id: string; label: string; blocks: Block[] };
export type AdminPage = { id: string; label: string; path: string; description: string; tabs: PageTab[] };

export const ADMIN_PAGES: AdminPage[] = [
  {
    id: 'home', label: 'Home', path: '/', description: 'Slider, intro, mineral card, feature cards and delivery band.',
    tabs: [
      { id: 'slider', label: 'Slider', blocks: [{ kind: 'collection', key: 'slides' }] },
      { id: 'intro', label: 'Intro & numbers', blocks: [{ kind: 'settings', group: 'home_intro' }, { kind: 'collection', key: 'stats', scope: 'home', title: 'Numbers' }] },
      { id: 'minerals', label: 'Mineral card', blocks: [{ kind: 'settings', group: 'home_minerals' }, { kind: 'collection', key: 'minerals', title: 'Mineral values' }] },
      { id: 'features', label: 'Feature cards', blocks: [{ kind: 'collection', key: 'features', scope: 'home_features' }] },
      { id: 'delivery', label: 'Delivery band', blocks: [{ kind: 'settings', group: 'home_delivery' }] },
    ],
  },
  {
    id: 'about', label: 'About', path: '/about', description: 'Header, story, numbers, source, values and reviews.',
    tabs: [
      { id: 'header', label: 'Header', blocks: [{ kind: 'settings', group: 'about_header' }] },
      { id: 'story', label: 'Story & quote', blocks: [{ kind: 'settings', group: 'about_story' }] },
      { id: 'numbers', label: 'Numbers', blocks: [{ kind: 'collection', key: 'stats', scope: 'about' }] },
      { id: 'source', label: 'Source', blocks: [{ kind: 'settings', group: 'about_source' }, { kind: 'collection', key: 'features', scope: 'about_source', title: 'Checklist' }] },
      { id: 'steps', label: 'Process summary', blocks: [{ kind: 'collection', key: 'features', scope: 'about_steps', note: 'The five-step summary. The full 14 stages are on the Process page.' }] },
      { id: 'values', label: 'Values', blocks: [{ kind: 'collection', key: 'features', scope: 'about_values' }] },
      { id: 'reviews', label: 'Reviews', blocks: [{ kind: 'collection', key: 'reviews' }] },
    ],
  },
  {
    id: 'process', label: 'Process', path: '/process', description: 'Header, the 14 stages and the 4 phases.',
    tabs: [
      { id: 'header', label: 'Header & numbers', blocks: [{ kind: 'settings', group: 'process_header' }, { kind: 'collection', key: 'stats', scope: 'process', title: 'Numbers' }] },
      { id: 'stages', label: 'Stages', blocks: [{ kind: 'collection', key: 'process_steps' }] },
      { id: 'phases', label: 'Phases', blocks: [{ kind: 'collection', key: 'process_phases' }] },
    ],
  },
  {
    id: 'products', label: 'Products', path: '/products', description: 'Bottles and jars, brands and the section heading.',
    tabs: [
      { id: 'list', label: 'Products', blocks: [{ kind: 'collection', key: 'products' }] },
      { id: 'brands', label: 'Brands', blocks: [{ kind: 'collection', key: 'brands' }] },
      { id: 'heading', label: 'Heading', blocks: [{ kind: 'settings', group: 'products_heading' }] },
    ],
  },
  {
    id: 'contact', label: 'Contact', path: '/contact', description: 'Contact details, header, distributor band and FAQs.',
    tabs: [
      { id: 'details', label: 'Contact details', blocks: [{ kind: 'settings', group: 'contact_details' }] },
      { id: 'header', label: 'Header', blocks: [{ kind: 'settings', group: 'contact_header' }] },
      { id: 'distributor', label: 'Distributor band', blocks: [{ kind: 'settings', group: 'contact_distributor' }] },
      { id: 'faqs', label: 'FAQs', blocks: [{ kind: 'collection', key: 'faqs' }] },
    ],
  },
];

export const getAdminPage = (id: string) => ADMIN_PAGES.find((p) => p.id === id);

/** Only allow redirects back into the admin panel. */
export function safeBack(back: unknown, fallback = '/admin') {
  const b = typeof back === 'string' ? back : '';
  return b.startsWith('/admin') && !b.startsWith('//') ? b : fallback;
}
