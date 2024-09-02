E-Com Product Management

Overview

This project is a simple e-commerce product management application built with Next.js and React. It allows users to view, edit, and manage a list of products. Each product includes details such as name, description, price, category, and image. The application uses local storage to persist product data and offers a basic interface for interacting with the product catalog.

Features

- View a list of products with details including name, description, price, category, and image.
- Edit existing product details.
- Add new products.
- Delete products from the catalog.
- Mobile-responsive design for better usability on various devices.

Design Decisions

- Local Storage: Used for persisting product data due to its simplicity and the scope of the project. This avoids the need for a backend service.
- Component-Based Architecture**: Leveraged React's component-based structure for modularity and reusability.
- Tailwind CSS: Utilized Tailwind CSS for styling to quickly build a responsive and modern UI.
- Image Handling: Stored images in the `public/images` directory and referenced them with relative paths for easy access.

Setup and Running the Project

Prerequisites

- Node.js (v14 or later)
- npm (v6 or later) or Yarn

Installation

1. Clone the repository:
   bash
   git clone https://github.com/DaekVayder/e-com

   
2. cd e-com
3. npm install
4. npm run dev

   it will be hosted : localhost:3000

SEO Considerations
Meta Tags: The project does not currently include advanced SEO features. For SEO improvements, consider adding meta tags and structured data in the <head> of the document.
Accessibility: Basic accessibility features are included, such as alt text for images. Additional accessibility enhancements can be made as needed.

My Notes
This is a basic project designed to demonstrate product management in a simple e-commerce context. For production use, consider integrating a backend service and advanced SEO features.
Ensure image filenames and paths are correctly referenced to avoid 404 errors for images.

License
This project is licensed under the MIT License. See the LICENSE file for details.
