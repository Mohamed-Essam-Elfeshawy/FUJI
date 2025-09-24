// Basic product catalog for the elevator store
// Categories: elevators, spare_parts, services

import gearless_img from '../images/Elevators/gearless_img_option_01.jpg';
import panorama_img from '../images/Elevators/panorama_img_option_02.jpg';
import gearbox_img from '../images/Elevators/gearbox_img.png';
import maintenance_img from '../images/OurServices/maintenance_option_01.jpg';
import buttons_img from '../images/OurDesigns/Buttons/touch_button.jpg';
import food_elevator_img from '../images/Elevators/food_img_option_01.jpg';
import hospital_elevator_img from '../images/Elevators/disables_img_option_01.jpg';
import installation_service_img from '../images/OurServices/elevator_installation.jpg';

export const PRODUCTS = [
  {
    id: 'elev-gearless-01',
    category: 'elevators',
    nameEN: 'Gearless Elevator',
    nameAR: 'مصعد بدون تروس',
    descriptionEN: 'Energy-efficient, low-noise elevator for modern buildings.',
    descriptionAR: 'مصعد موفر للطاقة وهادئ للمباني الحديثة.',
    price: 24999,
    image: gearless_img,
    // Keep backward compatibility
    name: 'Gearless Elevator',
    description: 'Energy-efficient, low-noise gearless traction elevator ideal for modern buildings.',
  },
  {
    id: 'elev-panorama-01',
    category: 'elevators',
    nameEN: 'Panorama Elevator',
    nameAR: 'مصعد بانوراما',
    descriptionEN: 'Glass-walled panoramic cabin with elegant design.',
    descriptionAR: 'كابينة بانورامية زجاجية بتصميم أنيق.',
    price: 32999,
    image: panorama_img,
    // Keep backward compatibility
    name: 'Panorama Elevator',
    description: 'Panoramic cabin with glass walls, combining aesthetics and performance.',
  },
  {
    id: 'elev-gearbox-01',
    category: 'elevators',
    nameEN: 'Gearbox Elevator',
    nameAR: 'مصعد بصندوق تروس',
    descriptionEN: 'Reliable and cost-effective for residential buildings.',
    descriptionAR: 'موثوق واقتصادي للمباني السكنية.',
    price: 19999,
    image: gearbox_img,
    // Keep backward compatibility
    name: 'Gearbox Elevator',
    description: 'Reliable traction with easy maintenance, great value for residential buildings.',
  },
  {
    id: 'part-buttons-01',
    category: 'spare_parts',
    nameEN: 'Touch Buttons Set',
    nameAR: 'مجموعة أزرار لمسية',
    descriptionEN: 'Durable illuminated touch buttons for cabins.',
    descriptionAR: 'أزرار لمسية مضيئة ومتينة للكابينات.',
    price: 499,
    image: buttons_img,
    // Keep backward compatibility
    name: 'Touch Buttons Set',
    description: 'Durable, illuminated touch button panel set for cabins and landings.',
  },
  {
    id: 'service-maintenance-01',
    category: 'services',
    nameEN: 'Annual Maintenance Plan',
    nameAR: 'خطة الصيانة السنوية',
    descriptionEN: '12-month maintenance plan with priority support.',
    descriptionAR: 'خطة صيانة سنوية مع دعم مميز.',
    price: 899,
    image: maintenance_img,
    // Keep backward compatibility
    name: 'Annual Maintenance Plan',
    description: '12-month preventive maintenance plan with priority support and safety checks.',
  },
  {
    id: 'elev-food-01',
    category: 'elevators',
    nameEN: 'Food Service Elevator',
    nameAR: 'مصعد خدمة الطعام',
    descriptionEN: 'Specialized elevator for restaurants and food service.',
    descriptionAR: 'مصعد متخصص للمطاعم وخدمة الطعام.',
    price: 18999,
    image: food_elevator_img,
    // Keep backward compatibility
    name: 'Food Service Elevator',
    description: 'Specialized elevator designed for restaurants and food service operations.',
  },
  {
    id: 'elev-hospital-01',
    category: 'elevators',
    nameEN: 'Hospital Elevator',
    nameAR: 'مصعد المستشفيات',
    descriptionEN: 'Medical-grade elevator with accessibility features.',
    descriptionAR: 'مصعد طبي مع ميزات إمكانية الوصول.',
    price: 35999,
    image: hospital_elevator_img,
    // Keep backward compatibility
    name: 'Hospital Elevator',
    description: 'Medical-grade elevator with advanced accessibility features for healthcare facilities.',
  },
  {
    id: 'service-installation-01',
    category: 'services',
    nameEN: 'Professional Installation',
    nameAR: 'التركيب الاحترافي',
    descriptionEN: 'Complete elevator installation by certified technicians.',
    descriptionAR: 'تركيب مصاعد كامل بواسطة فنيين معتمدين.',
    price: 2999,
    image: installation_service_img,
    // Keep backward compatibility
    name: 'Professional Installation',
    description: 'Complete elevator installation service by our certified technicians.',
  },
];
