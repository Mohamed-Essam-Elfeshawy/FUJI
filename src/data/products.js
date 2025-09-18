// Basic product catalog for the elevator store
// Categories: elevators, spare_parts, services

import gearless_img from '../images/Elevators/gearless_img_option_01.jpg';
import panorama_img from '../images/Elevators/panorama_img_option_02.jpg';
import gearbox_img from '../images/Elevators/gearbox_img.png';
import maintenance_img from '../images/OurServices/maintenance_option_01.jpg';
import buttons_img from '../images/OurDesigns/Buttons/touch_button.jpg';

export const PRODUCTS = [
  {
    id: 'elev-gearless-01',
    category: 'elevators',
    name: 'Gearless Elevator',
    description: 'Energy-efficient, low-noise gearless traction elevator ideal for modern buildings.',
    price: 24999,
    image: gearless_img,
  },
  {
    id: 'elev-panorama-01',
    category: 'elevators',
    name: 'Panorama Elevator',
    description: 'Panoramic cabin with glass walls, combining aesthetics and performance.',
    price: 32999,
    image: panorama_img,
  },
  {
    id: 'elev-gearbox-01',
    category: 'elevators',
    name: 'Gearbox Elevator',
    description: 'Reliable traction with easy maintenance, great value for residential buildings.',
    price: 19999,
    image: gearbox_img,
  },
  {
    id: 'part-buttons-01',
    category: 'spare_parts',
    name: 'Touch Buttons Set',
    description: 'Durable, illuminated touch button panel set for cabins and landings.',
    price: 499,
    image: buttons_img,
  },
  {
    id: 'service-maintenance-01',
    category: 'services',
    name: 'Annual Maintenance Plan',
    description: '12-month preventive maintenance plan with priority support and safety checks.',
    price: 899,
    image: maintenance_img,
  },
];
