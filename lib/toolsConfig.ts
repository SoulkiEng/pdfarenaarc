export interface ToolMeta {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  category: 'organize' | 'convert' | 'optimize' | 'edit' | 'security';
  icon: string;
  badge?: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  steps: { step: number; title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
  features: { title: string; desc: string }[];
}

export const TOOLS: ToolMeta[] = [
  {
    id: 'merge-pdf',
    slug: 'merge-pdf',
    title: 'Merge PDF',
    shortDesc: 'Combine multiple PDF files into one single document in seconds.',
    category: 'organize',
    icon: 'Layers',
    badge: 'Popular',
    seoTitle: 'Merge PDF Online - Free & Secure PDF Combiner',
    seoDescription: 'Combine multiple PDFs into one document easily and quickly. 100% free, private client-side processing, no file limits or registration required.',
    keywords: ['merge pdf', 'combine pdf', 'join pdf files', 'free pdf merger online', 'merge pdf documents'],
    steps: [
      { step: 1, title: 'Select PDF Files', desc: 'Click the select button or drag and drop 2 or more PDF files into the upload box.' },
      { step: 2, title: 'Arrange Order', desc: 'Check the order of your uploaded documents to ensure pages merge in your desired sequence.' },
      { step: 3, title: 'Merge & Download', desc: 'Click "Merge PDF" to combine all files instantly and download your single merged PDF.' }
    ],
    faqs: [
      { question: 'Is merging PDFs completely free?', answer: 'Yes! Our Merge PDF tool is 100% free with unlimited usage. You do not need to create an account or provide payment information.' },
      { question: 'Are my PDF files safe and private?', answer: 'Absolutely. All processing occurs locally right inside your web browser. Your sensitive files are never uploaded or stored on any external server.' },
      { question: 'Can I merge password-protected PDFs?', answer: 'If your file has a password, unlock it first using our Unlock PDF tool before merging.' },
      { question: 'What is the maximum number of files I can combine?', answer: 'You can combine as many PDF files as your device memory allows without any artificial limits.' }
    ],
    features: [
      { title: 'Zero Server Uploads', desc: 'Files stay strictly on your device for unmatched privacy and security.' },
      { title: 'Lightning Fast', desc: 'Instant merging powered by modern WebAssembly and client-side processing.' },
      { title: 'Custom File Ordering', desc: 'Easily rearrange PDFs in your preferred sequence before combining.' }
    ]
  },
  {
    id: 'split-pdf',
    slug: 'split-pdf',
    title: 'Split PDF',
    shortDesc: 'Extract individual pages or custom page ranges into independent PDFs.',
    category: 'organize',
    icon: 'Scissors',
    badge: 'Popular',
    seoTitle: 'Split PDF Online - Separate PDF Pages Instantly',
    seoDescription: 'Split PDF files into separate pages or custom ranges. Free, fast, private, and works directly in your web browser.',
    keywords: ['split pdf', 'separate pdf pages', 'extract pdf pages', 'cut pdf online', 'pdf splitter'],
    steps: [
      { step: 1, title: 'Choose PDF File', desc: 'Upload the PDF document you want to split or separate.' },
      { step: 2, title: 'Choose Mode & Range', desc: 'Choose between extracting all pages into a ZIP or specifying a range like "1-3, 5".' },
      { step: 3, title: 'Download Split PDFs', desc: 'Click "Split PDF" to generate and download your extracted files.' }
    ],
    faqs: [
      { question: 'How do I specify a page range to split?', answer: 'You can type comma-separated values and hyphens such as "1-5, 8, 11-14" to extract exactly those pages.' },
      { question: 'Will image quality be preserved?', answer: 'Yes, splitting does not alter or recompress the original vector graphics, fonts, or image elements.' },
      { question: 'Can I extract all pages at once?', answer: 'Yes! Select the "Extract All Pages" option, and all pages will be downloaded neatly packed inside a ZIP file.' }
    ],
    features: [
      { title: 'Precision Ranges', desc: 'Extract custom page ranges or individual chapters with pinpoint accuracy.' },
      { title: 'ZIP Archive Export', desc: 'Bulk download all single pages in one tidy ZIP archive.' },
      { title: '100% Confidential', desc: 'Your private financial or personal records never leave your browser.' }
    ]
  },
  {
    id: 'compress-pdf',
    slug: 'compress-pdf',
    title: 'Compress PDF',
    shortDesc: 'Reduce PDF file size while preserving high visual quality.',
    category: 'optimize',
    icon: 'Minimize2',
    badge: 'Top Tool',
    seoTitle: 'Compress PDF Online - Reduce PDF File Size Free',
    seoDescription: 'Compress PDF files online without losing quality. Shrink large PDFs for easy email attachments and web upload.',
    keywords: ['compress pdf', 'reduce pdf size', 'shrink pdf', 'pdf size reducer', 'online pdf compressor'],
    steps: [
      { step: 1, title: 'Upload Heavy PDF', desc: 'Select or drop your large PDF document into the compressor.' },
      { step: 2, title: 'Select Compression Level', desc: 'Choose between Low, Medium (Recommended), or High compression.' },
      { step: 3, title: 'Download Compressed File', desc: 'Click "Compress PDF" to download your optimized, lightweight document.' }
    ],
    faqs: [
      { question: 'How much can I reduce my PDF size?', answer: 'Depending on the images and fonts in the document, file sizes can often be reduced by 30% to 70%.' },
      { question: 'Will text readability be affected?', answer: 'No! Vector text and font structures remain razor-sharp and vector-crisp.' },
      { question: 'Is there a file size limit?', answer: 'No arbitrary limits. You can compress large documents right within your computer or mobile browser.' }
    ],
    features: [
      { title: 'Smart Stream Optimization', desc: 'Removes duplicate objects, redundant metadata, and unneeded structures.' },
      { title: 'Email-Ready Files', desc: 'Ensure your PDFs easily fit within 25MB email attachment limits.' },
      { title: 'Instant Preview', desc: 'See exact bytes saved and percentage reduction before saving.' }
    ]
  },
  {
    id: 'jpg-to-pdf',
    slug: 'jpg-to-pdf',
    title: 'JPG to PDF',
    shortDesc: 'Convert JPG, PNG, and WebP images into high-quality PDF documents.',
    category: 'convert',
    icon: 'FileImage',
    badge: 'Popular',
    seoTitle: 'JPG to PDF Converter - Convert Images to PDF Online',
    seoDescription: 'Convert JPG, PNG, and image files to PDF documents in seconds. Custom orientation, margins, and bulk conversion.',
    keywords: ['jpg to pdf', 'image to pdf', 'convert png to pdf', 'photos to pdf', 'picture to pdf converter'],
    steps: [
      { step: 1, title: 'Select Images', desc: 'Upload one or multiple JPG, PNG, or WebP images.' },
      { step: 2, title: 'Set Orientation', desc: 'Choose Portrait or Landscape orientation for optimal alignment.' },
      { step: 3, title: 'Convert & Save', desc: 'Click "Convert to PDF" to generate and download your clean PDF file.' }
    ],
    faqs: [
      { question: 'Can I convert multiple images into a single PDF?', answer: 'Yes! You can upload dozens of photos and combine them into one continuous multi-page PDF book or album.' },
      { question: 'Does it support PNG and WebP formats?', answer: 'Yes, our converter accepts JPG, JPEG, PNG, and WebP formats seamlessly.' },
      { question: 'Is the image resolution preserved?', answer: 'Yes, your images are embedded with high clarity and accurate color representation.' }
    ],
    features: [
      { title: 'Multi-Image Support', desc: 'Batch merge hundreds of images into a single polished document.' },
      { title: 'A4 Standard Fitting', desc: 'Automatically aligns and centers photos to international A4 dimensions.' },
      { title: 'Zero Quality Loss', desc: 'Preserves fine details in receipts, photo scans, and artwork.' }
    ]
  },
  {
    id: 'rotate-pdf',
    slug: 'rotate-pdf',
    title: 'Rotate PDF',
    shortDesc: 'Rotate upside-down or sideways PDF pages by 90, 180, or 270 degrees.',
    category: 'edit',
    icon: 'RotateCw',
    seoTitle: 'Rotate PDF Online - Permanently Fix PDF Page Orientation',
    seoDescription: 'Rotate PDF pages permanently online. Fix inverted or landscape pages in seconds with 100% free in-browser processing.',
    keywords: ['rotate pdf', 'turn pdf pages', 'fix pdf orientation', 'rotate pdf 90 degrees', 'rotate pdf permanently'],
    steps: [
      { step: 1, title: 'Upload PDF', desc: 'Choose the PDF with inverted or sideways pages.' },
      { step: 2, title: 'Choose Rotation Angle', desc: 'Select 90° Clockwise, 180°, or 270° counter-clockwise.' },
      { step: 3, title: 'Save Rotated PDF', desc: 'Click "Rotate PDF" to permanently set the new page orientation.' }
    ],
    faqs: [
      { question: 'Is the rotation permanent?', answer: 'Yes, the rotation angle is saved directly in the PDF metadata and standard display coordinates.' },
      { question: 'Can I rotate all pages at once?', answer: 'Yes, you can apply orientation adjustments across all pages simultaneously.' }
    ],
    features: [
      { title: 'One-Click Orientation Fix', desc: 'Easily fix scanned documents that were loaded upside down.' },
      { title: 'Standard Standards Compliant', desc: 'Works across Adobe Acrobat, Chrome, macOS Preview, and mobile readers.' }
    ]
  },
  {
    id: 'watermark-pdf',
    slug: 'watermark-pdf',
    title: 'Watermark PDF',
    shortDesc: 'Stamp text watermarks like CONFIDENTIAL, DRAFT, or custom branding.',
    category: 'edit',
    icon: 'Stamp',
    seoTitle: 'Add Watermark to PDF Online - Free PDF Stamp & Branding',
    seoDescription: 'Add text watermarks to your PDF documents online. Customize opacity, angle, font size, and color for confidential documents.',
    keywords: ['watermark pdf', 'add watermark to pdf', 'stamp pdf', 'confidential pdf watermark', 'pdf brand stamp'],
    steps: [
      { step: 1, title: 'Select PDF', desc: 'Choose the document you want to protect or brand.' },
      { step: 2, title: 'Customize Watermark', desc: 'Type your text (e.g. CONFIDENTIAL), pick color, size, and opacity.' },
      { step: 3, title: 'Apply & Download', desc: 'Click "Apply Watermark" to generate your stamped PDF document.' }
    ],
    faqs: [
      { question: 'Can I adjust watermark transparency?', answer: 'Yes! You can choose opacity from faint background watermarks (15%) to prominent stamps (70%).' },
      { question: 'Will the watermark appear on every page?', answer: 'Yes, the watermark is applied evenly across every page in your document.' }
    ],
    features: [
      { title: 'Custom Opacity & Angle', desc: 'Adjust diagonal tilt (45°) and subtle transparency to avoid obscuring text.' },
      { title: 'Color Presets', desc: 'Choose classic Gray, Bold Red, Blue, or Deep Black.' }
    ]
  },
  {
    id: 'page-numbers',
    slug: 'page-numbers',
    title: 'Add Page Numbers',
    shortDesc: 'Insert clean page numbers into your PDF with custom positioning.',
    category: 'edit',
    icon: 'Hash',
    seoTitle: 'Add Page Numbers to PDF - Free Online PDF Numbering Tool',
    seoDescription: 'Add page numbers to PDF documents online. Choose position, font size, and numbering formats like Page 1 of N easily.',
    keywords: ['add page numbers to pdf', 'number pdf pages', 'paginate pdf', 'pdf page numbering online'],
    steps: [
      { step: 1, title: 'Upload PDF Document', desc: 'Select the file requiring pagination.' },
      { step: 2, title: 'Select Position & Format', desc: 'Choose bottom-center, bottom-right, or top-right, and format like "Page 1 of 10".' },
      { step: 3, title: 'Download Numbered PDF', desc: 'Click "Add Numbers" to instantly apply pagination and save.' }
    ],
    faqs: [
      { question: 'Can I format page numbers as "Page X of Y"?', answer: 'Yes, you can choose simple numerals (1, 2, 3), "Page 1", or comprehensive "Page 1 of 10" formatting.' },
      { question: 'Where are page numbers positioned?', answer: 'You can position numbers in the bottom-center, bottom-right, or top-right corners with standard margins.' }
    ],
    features: [
      { title: 'Professional Formatting', desc: 'Ideal for academic theses, legal briefs, reports, and contracts.' },
      { title: 'Accurate Alignment', desc: 'Maintains uniform spacing across every page size and orientation.' }
    ]
  },
  {
    id: 'protect-pdf',
    slug: 'protect-pdf',
    title: 'Protect PDF',
    shortDesc: 'Encrypt your PDF with a password to prevent unauthorized access.',
    category: 'security',
    icon: 'Lock',
    badge: 'Security',
    seoTitle: 'Protect PDF Online - Password Protect & Encrypt PDF Files',
    seoDescription: 'Encrypt and password protect PDF files online. Secure confidential documents against unauthorized viewing and theft.',
    keywords: ['protect pdf', 'password protect pdf', 'encrypt pdf', 'lock pdf', 'secure pdf online'],
    steps: [
      { step: 1, title: 'Select PDF File', desc: 'Upload the document you want to lock and encrypt.' },
      { step: 2, title: 'Enter Password', desc: 'Type a strong password to protect your file.' },
      { step: 3, title: 'Download Protected PDF', desc: 'Click "Protect PDF" to secure your file with encryption.' }
    ],
    faqs: [
      { question: 'Can someone open the PDF without my password?', answer: 'No. The file requires the exact password you specify in order to open and view the contents.' },
      { question: 'Is my password sent to your server?', answer: 'Never! Everything is encrypted on your local computer browser. We never see or store your passwords.' }
    ],
    features: [
      { title: 'Client-Side Security', desc: 'Your secret credentials never leave your browser.' },
      { title: 'Universal Compatibility', desc: 'Opens on all standard PDF viewers once the correct password is typed.' }
    ]
  },
  {
    id: 'unlock-pdf',
    slug: 'unlock-pdf',
    title: 'Unlock PDF',
    shortDesc: 'Remove password and security restrictions from your PDF files.',
    category: 'security',
    icon: 'Unlock',
    seoTitle: 'Unlock PDF Online - Remove Password & Restrictions from PDF',
    seoDescription: 'Remove password and security restrictions from PDF files online. Free, safe, and instant browser-based PDF unlocking.',
    keywords: ['unlock pdf', 'remove pdf password', 'decrypt pdf', 'pdf password remover', 'unlock pdf file online'],
    steps: [
      { step: 1, title: 'Upload Locked PDF', desc: 'Select the password-protected PDF file.' },
      { step: 2, title: 'Verify Permission', desc: 'Provide the document password to decrypt security flags.' },
      { step: 3, title: 'Download Unlocked PDF', desc: 'Save an unprotected PDF you can freely read, edit, and print.' }
    ],
    faqs: [
      { question: 'Can I remove restrictions if I know the password?', answer: 'Yes! Simply type the password once to permanently save an unlocked copy.' },
      { question: 'Will the content of the PDF be altered?', answer: 'Not at all. The contents, formatting, and images remain 100% identical.' }
    ],
    features: [
      { title: 'Remove Printing Limits', desc: 'Eliminate printing, copying, and editing restrictions.' },
      { title: 'Instant Decryption', desc: 'Generates a clean unlocked PDF in milliseconds.' }
    ]
  },
  {
    id: 'organize-pdf',
    slug: 'organize-pdf',
    title: 'Organize PDF',
    shortDesc: 'Sort, reorder, delete, and rotate pages in your PDF document.',
    category: 'organize',
    icon: 'Grid',
    seoTitle: 'Organize PDF Online - Sort, Delete & Rearrange PDF Pages',
    seoDescription: 'Organize PDF pages online. Rearrange page order, remove unneeded pages, and rotate individual pages easily.',
    keywords: ['organize pdf', 'reorder pdf pages', 'delete pdf pages', 'rearrange pdf', 'sort pdf pages'],
    steps: [
      { step: 1, title: 'Upload PDF', desc: 'Choose the PDF you want to reorganize.' },
      { step: 2, title: 'Reorder or Remove Pages', desc: 'Drag or delete specific pages you no longer need.' },
      { step: 3, title: 'Download Clean PDF', desc: 'Click "Save Organized PDF" to generate your new clean document.' }
    ],
    faqs: [
      { question: 'Can I delete multiple pages?', answer: 'Yes, you can remove individual pages with a single click before saving.' },
      { question: 'Can I change page order?', answer: 'Yes, you can move pages to any position in the document.' }
    ],
    features: [
      { title: 'Visual Organization', desc: 'Clean page thumbnails and quick delete/rotate actions.' },
      { title: 'Instant Processing', desc: 'Produces your reorganized file right on your computer.' }
    ]
  },
  {
    id: 'pdf-to-text',
    slug: 'pdf-to-text',
    title: 'PDF to Text',
    shortDesc: 'Extract raw text and content from PDF documents instantly.',
    category: 'convert',
    icon: 'FileText',
    seoTitle: 'PDF to Text Converter Online - Extract Text from PDF Free',
    seoDescription: 'Extract text from PDF online for free. Convert PDF to editable TXT format with 100% privacy and zero data leakage.',
    keywords: ['pdf to text', 'extract text from pdf', 'convert pdf to txt', 'pdf text extractor', 'copy text from pdf'],
    steps: [
      { step: 1, title: 'Upload PDF Document', desc: 'Choose the PDF containing text you want to extract.' },
      { step: 2, title: 'Extract Content', desc: 'Our engine extracts text blocks and document contents.' },
      { step: 3, title: 'Download or Copy Text', desc: 'Download as a .txt file or copy directly to clipboard.' }
    ],
    faqs: [
      { question: 'Can I copy the extracted text to clipboard?', answer: 'Yes, our tool provides an instant one-click "Copy to Clipboard" button as well as a TXT download option.' },
      { question: 'Does it work with scanned PDFs?', answer: 'It works seamlessly with digital PDFs, and extracts text structures directly.' }
    ],
    features: [
      { title: 'Instant One-Click Copy', desc: 'Copy entire books or reports straight to your clipboard.' },
      { title: 'Structured Page Breaks', desc: 'Preserves page markers and clean paragraph spacing.' }
    ]
  },
  {
    id: 'pdf-to-jpg',
    slug: 'pdf-to-jpg',
    title: 'PDF to JPG',
    shortDesc: 'Convert each PDF page into high-quality JPG or PNG images.',
    category: 'convert',
    icon: 'Image',
    badge: 'Popular',
    seoTitle: 'Convert PDF to JPG Online - Free & High Resolution',
    seoDescription: 'Extract pages from your PDF into high-quality JPG images instantly. 100% free client-side conversion, no file size limits.',
    keywords: ['pdf to jpg', 'convert pdf to image', 'pdf to jpeg online', 'extract images from pdf', 'free pdf to jpg converter'],
    steps: [
      { step: 1, title: 'Upload PDF', desc: 'Select or drop the PDF file you want to convert into images.' },
      { step: 2, title: 'Render Pages', desc: 'Our in-browser engine renders each page at crisp high-DPI quality.' },
      { step: 3, title: 'Download Images', desc: 'Download individual images or all pages packed neatly in a ZIP file.' }
    ],
    faqs: [
      { question: 'What image formats can I download?', answer: 'You can download high-resolution JPG or PNG images with 100% vector sharpness.' },
      { question: 'Are my pages uploaded anywhere?', answer: 'Never. Rendering happens locally in your browser with WebAssembly.' }
    ],
    features: [
      { title: 'Crisp High-DPI Output', desc: 'Generates ultra-sharp images suitable for print or presentations.' },
      { title: 'ZIP Archive Download', desc: 'Single-click download for multi-page documents.' }
    ]
  },
  {
    id: 'sign-pdf',
    slug: 'sign-pdf',
    title: 'Sign PDF',
    shortDesc: 'Create or upload your electronic signature and sign PDF documents legally.',
    category: 'edit',
    icon: 'PenTool',
    badge: 'Top Tool',
    seoTitle: 'Sign PDF Online Free - Digital & Electronic Signature Tool',
    seoDescription: 'Sign PDF files online with legally binding electronic signatures. Draw, type, or upload your signature directly in your browser with zero data storage.',
    keywords: ['sign pdf online', 'electronic signature pdf', 'draw signature on pdf', 'free pdf signer', 'sign document online'],
    steps: [
      { step: 1, title: 'Upload PDF Document', desc: 'Choose the contract, agreement, or form you need to sign.' },
      { step: 2, title: 'Create Signature', desc: 'Draw your signature using mouse/touchpad, type it out, or upload an image.' },
      { step: 3, title: 'Place & Download', desc: 'Position the signature on the page and download your officially signed PDF.' }
    ],
    faqs: [
      { question: 'Is electronic signing legal?', answer: 'Yes, electronic signatures are widely recognized under international e-sign frameworks.' },
      { question: 'Is my signature kept private?', answer: 'Yes, your signature is never saved on any server. It is embedded directly in your browser.' }
    ],
    features: [
      { title: 'Draw, Type, or Upload', desc: 'Full flexibility to create your natural signature.' },
      { title: 'Precise Positioning', desc: 'Drag, resize, and place signatures exactly where needed.' }
    ]
  },
  {
    id: 'word-to-pdf',
    slug: 'word-to-pdf',
    title: 'Word to PDF',
    shortDesc: 'Convert DOC and DOCX Word documents into clean, standard PDF files.',
    category: 'convert',
    icon: 'FileText',
    badge: 'Popular',
    seoTitle: 'Word to PDF Converter Online - Free DOCX to PDF',
    seoDescription: 'Convert Microsoft Word documents (DOC, DOCX) to PDF format instantly. Preserves fonts, tables, and formatting without uploading to external servers.',
    keywords: ['word to pdf', 'convert docx to pdf', 'doc to pdf online free', 'ms word to pdf converter', 'free word to pdf'],
    steps: [
      { step: 1, title: 'Select Word Document', desc: 'Upload your .docx or .doc file.' },
      { step: 2, title: 'Format & Convert', desc: 'Our engine parses headings, paragraphs, and styles into standard PDF layout.' },
      { step: 3, title: 'Download PDF', desc: 'Download your polished, universally readable PDF.' }
    ],
    faqs: [
      { question: 'Will formatting be preserved?', answer: 'Yes, standard text styles, headings, tables, and lists are cleanly preserved.' },
      { question: 'Do I need Microsoft Office installed?', answer: 'No! The conversion runs completely inside your browser without any software installation.' }
    ],
    features: [
      { title: 'Universal Layout', desc: 'Locks formatting so documents look identical on any device.' },
      { title: 'No File Limits', desc: 'Convert as many Word documents as needed without registration.' }
    ]
  },
  {
    id: 'pdf-to-word',
    slug: 'pdf-to-word',
    title: 'PDF to Word',
    shortDesc: 'Convert PDF documents into editable Microsoft Word (.docx) files.',
    category: 'convert',
    icon: 'FileEdit',
    badge: 'Popular',
    seoTitle: 'PDF to Word Converter Online - Free & Editable DOCX',
    seoDescription: 'Convert PDF files into editable DOCX Word documents easily. Extract text, formatting, and tables without paying for expensive software.',
    keywords: ['pdf to word', 'convert pdf to docx', 'pdf to editable word', 'free pdf to docx converter', 'pdf to word online'],
    steps: [
      { step: 1, title: 'Choose PDF File', desc: 'Upload the PDF document you want to edit in Microsoft Word.' },
      { step: 2, title: 'Extract & Build DOCX', desc: 'Our tool extracts text paragraphs and constructs an editable .docx file.' },
      { step: 3, title: 'Download Word File', desc: 'Open and edit the converted file in Microsoft Word, Google Docs, or LibreOffice.' }
    ],
    faqs: [
      { question: 'Can I edit the converted file in Microsoft Word?', answer: 'Yes! The downloaded file is a standard .docx document that is 100% editable.' },
      { question: 'Is this tool really free?', answer: 'Yes, unlike Adobe Acrobat which charges monthly fees, our PDF to Word converter is completely free.' }
    ],
    features: [
      { title: 'Fully Editable Output', desc: 'Revisable text, headings, and clean paragraph breaks.' },
      { title: 'Zero Data Storage', desc: 'Confidential business reports stay strictly on your local computer.' }
    ]
  },
  {
    id: 'redact-pdf',
    slug: 'redact-pdf',
    title: 'Redact PDF',
    shortDesc: 'Permanently black out and remove confidential text, numbers, and sensitive data.',
    category: 'security',
    icon: 'EyeOff',
    badge: 'Confidential',
    seoTitle: 'Redact PDF Online Free - Black Out Sensitive Text in PDF',
    seoDescription: 'Permanently redact and black out confidential text, financial figures, and private info in PDF. 100% client-side privacy, impossible to uncover.',
    keywords: ['redact pdf', 'black out text in pdf', 'hide sensitive info pdf', 'free pdf redaction online', 'confidential pdf redact'],
    steps: [
      { step: 1, title: 'Upload PDF', desc: 'Choose the document with private information you want to conceal.' },
      { step: 2, title: 'Mark Redaction Areas', desc: 'Select or draw black opaque redaction boxes over sensitive fields.' },
      { step: 3, title: 'Flatten & Download', desc: 'Click "Apply Redaction" to permanently burn redactions into the document.' }
    ],
    faqs: [
      { question: 'Can someone undo or remove the black boxes?', answer: 'No! Redacted areas are permanently burned into the PDF structure, making it impossible to uncover the hidden data.' },
      { question: 'Why is this better than other online redactors?', answer: 'Other tools require uploading your sensitive confidential documents to their servers. PDFArenaArc does it 100% locally.' }
    ],
    features: [
      { title: 'Permanent Obfuscation', desc: 'True redaction that removes underlying content completely.' },
      { title: 'Ideal for Legal & Finance', desc: 'Perfect for masking bank numbers, SSNs, and confidential clauses.' }
    ]
  },
  {
    id: 'grayscale-pdf',
    slug: 'grayscale-pdf',
    title: 'Grayscale PDF',
    shortDesc: 'Convert colorful PDF documents into black-and-white to save ink and reduce size.',
    category: 'optimize',
    icon: 'Palette',
    badge: 'Eco Print',
    seoTitle: 'Convert PDF to Grayscale Online - Black and White PDF Free',
    seoDescription: 'Convert color PDFs to pure black and white / grayscale online. Ideal for printing, official court and visa document requirements, and saving ink.',
    keywords: ['grayscale pdf', 'convert pdf to black and white', 'b&w pdf converter', 'print friendly pdf', 'monochrome pdf online'],
    steps: [
      { step: 1, title: 'Select Color PDF', desc: 'Upload the document you want to convert to black & white.' },
      { step: 2, title: 'Convert to Monochrome', desc: 'Our engine applies luminance conversion to transform all colors to grayscale.' },
      { step: 3, title: 'Download B&W PDF', desc: 'Save your print-ready monochrome PDF with significant ink savings.' }
    ],
    faqs: [
      { question: 'Why convert a PDF to grayscale?', answer: 'It dramatically reduces printer ink costs, speeds up printing, and meets official submission standards for courts and visa applications.' },
      { question: 'Will text readability be maintained?', answer: 'Yes, contrast is optimized so all text remains crisp, dark, and highly legible.' }
    ],
    features: [
      { title: 'Printer-Friendly Output', desc: 'Saves expensive color toner cartridges.' },
      { title: 'Official Compliance', desc: 'Meets government and academic monochrome filing specifications.' }
    ]
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Tools' },
  { id: 'organize', label: 'Organize PDF' },
  { id: 'optimize', label: 'Optimize PDF' },
  { id: 'convert', label: 'Convert PDF' },
  { id: 'edit', label: 'Edit PDF' },
  { id: 'security', label: 'PDF Security' },
];
