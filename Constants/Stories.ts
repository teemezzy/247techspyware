// lib/blogData.ts
export const stories = [
    {
      id: 1,
      title: "Apple Unveils Revolutionary M4 Chip with 40% Performance Boost",
      author: "James Wilson",
      date: "2024-11-16",
      image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&h=600&fit=crop",
      category: "TECHNOLOGY",
      featured: true,
      excerpt: "Apple's latest silicon breakthrough promises unprecedented performance for creative professionals and developers.",
      content: `
        <p>Apple has officially announced its M4 chip, marking another significant milestone in the company's transition away from Intel processors. The new chip delivers a 40% performance improvement over the M3 while maintaining impressive power efficiency.</p>
  
        <h2>Key Specifications</h2>
        <p>The M4 chip features a 12-core CPU with 8 performance cores and 4 efficiency cores, alongside a 16-core GPU. Built on TSMC's advanced 3nm process, the chip includes 24GB of unified memory in the base configuration, with options up to 128GB for professional users.</p>
  
        <h2>Performance Benchmarks</h2>
        <p>Early benchmarks show the M4 outperforming competitors in both single-core and multi-core tasks. Video editors using Final Cut Pro are reporting 4K render times reduced by up to 35%, while developers see significant improvements in compilation speeds for large projects.</p>
  
        <h2>Neural Engine Enhancements</h2>
        <p>The upgraded 18-core Neural Engine can perform 45 trillion operations per second, making it ideal for machine learning tasks and AI-powered applications. This represents a 50% improvement over the M3's Neural Engine.</p>
  
        <h2>Availability and Pricing</h2>
        <p>The M4 chip will debut in the new MacBook Pro models starting at $1,999, with iMac and Mac Studio updates expected in early 2025. Pre-orders begin next week, with devices shipping by the end of November.</p>
  
        <p>Industry analysts predict the M4 will solidify Apple's position as a leader in custom silicon design, putting pressure on competitors to accelerate their own chip development programs.</p>
      `
    },
    {
      id: 2,
      title: "Google Announces Gemini 2.0: The Next Generation of AI",
      author: "Sarah Chen",
      date: "2024-11-14",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
      category: "TECHNOLOGY",
      featured: true,
      excerpt: "Google's latest AI model promises multimodal capabilities that could reshape how we interact with technology.",
      content: `
        <p>Google has unveiled Gemini 2.0, its most advanced AI model to date, featuring enhanced multimodal capabilities that seamlessly integrate text, images, video, and audio processing in real-time.</p>
  
        <h2>Breakthrough Multimodal Processing</h2>
        <p>Unlike its predecessor, Gemini 2.0 can simultaneously process and understand multiple types of input. During the demonstration, the AI analyzed a video while answering questions about its content, generating relevant images, and even composing background music—all in a single interaction.</p>
  
        <h2>Performance Improvements</h2>
        <p>Google reports that Gemini 2.0 is 3x faster than Gemini 1.5 while using 40% less computational resources. The model has been trained on a diverse dataset spanning 100+ languages and can now understand context with unprecedented accuracy.</p>
  
        <h2>Developer Access</h2>
        <p>Starting December 1st, developers will gain access to Gemini 2.0 through Google's AI Studio and Vertex AI platforms. The company is offering free tier access for the first three months to encourage widespread adoption and experimentation.</p>
  
        <h2>Integration with Google Services</h2>
        <p>Gemini 2.0 will power enhancements across Google's ecosystem, including Gmail's Smart Compose, Google Docs' writing suggestions, and YouTube's content recommendations. Google Workspace users can expect these features to roll out in Q1 2025.</p>
  
        <h2>Privacy and Safety Features</h2>
        <p>Google emphasized its commitment to responsible AI development, highlighting new safety filters and content moderation systems built into Gemini 2.0. The model includes watermarking for AI-generated content and enhanced bias detection mechanisms.</p>
      `
    },
    {
      id: 3,
      title: "Meta Launches Quest 4: Mixed Reality Gets More Affordable",
      author: "David Park",
      date: "2024-11-12",
      image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&h=600&fit=crop",
      category: "TECHNOLOGY",
      featured: false,
      excerpt: "Meta's newest VR headset brings professional-grade mixed reality features to consumers at $399.",
      content: `
        <p>Meta has announced the Quest 4, a next-generation mixed reality headset that promises to make spatial computing accessible to mainstream consumers. Priced at $399, it's $100 cheaper than its predecessor while offering significant hardware upgrades.</p>
  
        <h2>Enhanced Display Technology</h2>
        <p>The Quest 4 features dual 4K micro-OLED displays with a 120Hz refresh rate, providing crystal-clear visuals with minimal screen-door effect. The field of view has been expanded to 110 degrees, offering a more immersive experience than previous models.</p>
  
        <h2>Pancake Optics and Comfort</h2>
        <p>Using advanced pancake lens technology, Meta has reduced the headset's weight by 25% compared to Quest 3. The redesigned head strap distributes weight more evenly, allowing for comfortable extended use sessions. Users report being able to wear the device for 3+ hours without discomfort.</p>
  
        <h2>Mixed Reality Capabilities</h2>
        <p>Full-color passthrough cameras with 12MP resolution enable seamless blending of virtual and real-world environments. The Quest 4's spatial awareness has been dramatically improved, with millimeter-accurate room mapping and object recognition.</p>
  
        <h2>Processing Power</h2>
        <p>Powered by Qualcomm's Snapdragon XR3 Gen 2 chip, the Quest 4 delivers 2.5x the graphics performance of Quest 3. Games load faster, environments render more quickly, and multitasking between apps is smoother than ever.</p>
  
        <h2>New Features and Apps</h2>
        <p>Meta is launching Quest 4 with 50+ exclusive titles, including partnerships with major studios. The device supports hand tracking 2.0, which no longer requires controllers for most applications, and includes eye-tracking for foveated rendering and social presence.</p>
  
        <h2>Battery Life and Accessories</h2>
        <p>With up to 3 hours of active use, the Quest 4 matches its predecessor's battery life despite the improved performance. An optional battery strap accessory can extend usage to 6 hours, available separately for $79.</p>
      `
    },
    {
      id: 4,
      title: "Tesla Unveils Self-Driving Software v13 with Full Autonomy",
      author: "Rebecca Martinez",
      date: "2024-11-10",
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop",
      category: "AUTOMOTIVE",
      featured: true,
      excerpt: "Tesla's latest Full Self-Driving update brings the company closer to its promise of full autonomy.",
      content: `
        <p>Tesla has released FSD Beta v13, marking what CEO Elon Musk calls "a quantum leap" in autonomous driving technology. The update introduces neural network improvements that dramatically enhance the vehicle's decision-making capabilities in complex urban environments.</p>
  
        <h2>What's New in v13</h2>
        <p>The latest version uses an end-to-end neural network trained on over 10 billion miles of real-world driving data. Unlike previous versions, v13 processes raw camera feeds directly into driving decisions without relying on hand-coded rules or heuristics.</p>
  
        <h2>Performance in Complex Scenarios</h2>
        <p>Early testers report significant improvements in handling unprotected left turns, navigating construction zones, and responding to emergency vehicles. The system now successfully completes 95% of urban drives without requiring driver intervention, up from 78% in v12.</p>
  
        <h2>Safety Improvements</h2>
        <p>Tesla claims v13 reduces collision rates by 60% compared to human drivers. The system's reaction time to unexpected obstacles has been reduced to 120 milliseconds, faster than the average human reaction time of 250 milliseconds.</p>
  
        <h2>Regulatory Considerations</h2>
        <p>While v13 represents a major technical achievement, Tesla emphasizes that drivers must remain attentive and ready to take control. The company is working with regulators in multiple states to eventually enable true hands-free operation.</p>
  
        <h2>Rollout Timeline</h2>
        <p>FSD Beta v13 is rolling out to 100,000 users initially, with plans to expand to all FSD subscribers by year-end. The $15,000 FSD package (or $199/month subscription) is required to access the new features.</p>
  
        <h2>Competition Response</h2>
        <p>Tesla's announcement has prompted responses from Waymo, Cruise, and traditional automakers. Industry analysts note that Tesla's camera-only approach differs from competitors' lidar-based systems, sparking debate about the optimal path to full autonomy.</p>
      `
    },
    {
      id: 5,
      title: "Microsoft Copilot Pro Gets Major Update with Custom GPT Support",
      author: "Alex Thompson",
      date: "2024-11-08",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
      category: "SOFTWARE",
      featured: false,
      excerpt: "Microsoft's AI assistant can now be customized with specialized knowledge for specific industries and workflows.",
      content: `
        <p>Microsoft has announced a significant update to Copilot Pro, introducing Custom GPT functionality that allows users and organizations to create specialized AI assistants tailored to their specific needs. The update positions Copilot as a more versatile tool for enterprise users.</p>
  
        <h2>Custom GPT Builder</h2>
        <p>The new Copilot Studio interface enables users to build custom versions of Copilot without coding. Simply describe your requirements in natural language, upload relevant documents, and the system automatically configures a specialized assistant with domain-specific knowledge.</p>
  
        <h2>Enterprise Applications</h2>
        <p>Companies can now create Copilots trained on internal documentation, company policies, and proprietary databases. A legal firm demonstrated a custom Copilot that references thousands of case files, while a healthcare provider showcased a HIPAA-compliant medical assistant.</p>
  
        <h2>Integration Enhancements</h2>
        <p>Custom Copilots integrate seamlessly with Microsoft 365 apps, Teams, and Power Platform. Users can invoke specialized assistants directly within Word, Excel, or PowerPoint, maintaining context across applications without switching interfaces.</p>
  
        <h2>Pricing Structure</h2>
        <p>Copilot Pro subscribers ($20/month) can create up to 5 custom GPTs. Enterprise customers with Microsoft 365 E3/E5 licenses receive unlimited custom GPTs with enhanced security features and admin controls. A new Business tier ($30/user/month) launches next quarter.</p>
  
        <h2>Security and Compliance</h2>
        <p>Microsoft emphasizes that custom GPTs respect existing data governance policies. Data used to train custom models remains within the organization's security boundary and is not used to improve Microsoft's general models. The system supports role-based access controls and audit logging.</p>
  
        <h2>Developer Ecosystem</h2>
        <p>Microsoft is launching a Copilot GPT Store where organizations can share or sell their custom assistants. Early partners include SAP, Salesforce, and ServiceNow, offering pre-built industry-specific Copilots.</p>
      `
    },
    {
      id: 6,
      title: "Nvidia RTX 5090 Breaks Performance Records in Gaming Benchmarks",
      author: "Kevin Johnson",
      date: "2024-11-05",
      image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&h=600&fit=crop",
      category: "HARDWARE",
      featured: true,
      excerpt: "Nvidia's flagship GPU delivers 70% performance improvement over previous generation with breakthrough ray tracing.",
      content: `
        <p>Nvidia has officially launched the RTX 5090, its most powerful consumer graphics card to date. Built on the new Ada Lovelace Next architecture with TSMC's 4nm process, the GPU sets new standards for gaming and creative workstation performance.</p>
  
        <h2>Architectural Improvements</h2>
        <p>The RTX 5090 packs 24,576 CUDA cores, 384 fourth-generation Tensor Cores, and 192 third-generation RT Cores. With 48GB of GDDR7 memory running at 32 Gbps, the card delivers 1.8TB/s of memory bandwidth—nearly double the RTX 4090.</p>
  
        <h2>Gaming Performance</h2>
        <p>In 4K gaming benchmarks, the RTX 5090 achieves 144+ fps in demanding titles like Cyberpunk 2077 with all ray tracing effects maxed out. It handles 8K gaming at 60+ fps in most AAA titles, making it the first GPU truly capable of 8K gaming without compromises.</p>
  
        <h2>DLSS 4 Technology</h2>
        <p>The card introduces DLSS 4 with AI-generated frames that can multiply performance by up to 8x. The new Frame Generation 3.0 creates three AI frames for every rendered frame, dramatically improving smoothness while maintaining image quality.</p>
  
        <h2>Ray Tracing Revolution</h2>
        <p>Third-gen RT Cores deliver 4x the ray tracing performance of previous generation. Full path tracing—previously requiring significant performance compromises—now runs at playable frame rates in supported games.</p>
  
        <h2>Content Creation</h2>
        <p>Video editors report 8K ProRes rendering speeds 3x faster than RTX 4090. Blender cycles render times have been cut in half, while AI-powered upscaling and denoising workflows see even larger improvements thanks to enhanced Tensor Cores.</p>
  
        <h2>Pricing and Availability</h2>
        <p>The RTX 5090 launches at $1,799 (Founders Edition) with partner cards ranging from $1,899 to $2,299. Pre-orders open November 20th, with retail availability starting December 1st. Nvidia expects strong demand and is increasing production to avoid the shortage issues that plagued previous launches.</p>
  
        <h2>Power Requirements</h2>
        <p>Despite the performance gains, Nvidia has managed to keep TDP at 450W, same as RTX 4090. The card requires a new 12+4 pin power connector (adapter included) and Nvidia recommends an 850W power supply minimum.</p>
      `
    },
    {
      id: 7,
      title: "Samsung Galaxy S25 Ultra: 200MP Camera with AI Enhancement",
      author: "Lisa Wong",
      date: "2024-11-03",
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&h=600&fit=crop",
      category: "MOBILE",
      featured: false,
      excerpt: "Samsung's next flagship smartphone pushes mobile photography to new heights with AI-powered imaging.",
      content: `
        <p>Samsung has unveiled the Galaxy S25 Ultra, featuring a revolutionary 200MP main camera sensor with advanced AI processing that promises to redefine mobile photography standards.</p>
  
        <h2>Camera System</h2>
        <p>The quad-camera setup includes a 200MP wide sensor, 50MP ultrawide, 50MP 3x telephoto, and 50MP 10x periscope telephoto. Samsung's new AI Image Engine processes photos in real-time, optimizing exposure, color, and sharpness across all lenses simultaneously.</p>
  
        <h2>AI Features</h2>
        <p>The S25 Ultra introduces "PhotoGenius AI" which can remove unwanted objects, adjust lighting conditions post-capture, and even generate alternative composition suggestions. Night mode has been dramatically improved with AI-driven noise reduction.</p>
  
        <h2>Performance Specs</h2>
        <p>Powered by the Snapdragon 8 Gen 4 processor with 12GB RAM, the device handles intensive AI tasks effortlessly. The 5,000mAh battery supports 65W fast charging and 25W wireless charging.</p>
  
        <h2>Display Innovation</h2>
        <p>The 6.9-inch Dynamic AMOLED display features adaptive 1-240Hz refresh rate, automatically adjusting based on content. Peak brightness reaches 2,500 nits, ensuring excellent outdoor visibility.</p>
  
        <h2>Launch Details</h2>
        <p>The Galaxy S25 Ultra starts at $1,299 for 256GB, with pre-orders beginning November 15th. Samsung is offering trade-in credits up to $800 for select devices.</p>
      `
    },
    {
      id: 8,
      title: "Amazon Announces New AI-Powered Alexa with Enhanced Conversations",
      author: "Michael Roberts",
      date: "2024-11-01",
      image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&h=600&fit=crop",
      category: "AI",
      featured: false,
      excerpt: "Amazon's voice assistant gets a major AI upgrade, enabling more natural and contextual conversations.",
      content: `
        <p>Amazon has revealed a completely redesigned Alexa powered by large language models, transforming the voice assistant into a conversational AI that can maintain context across multiple interactions and handle complex, multi-step requests.</p>
  
        <h2>Conversational AI</h2>
        <p>The new Alexa can understand nuanced requests, remember conversation history, and respond naturally without requiring precise wake words for follow-up questions. Users can have flowing conversations similar to chatting with a human assistant.</p>
  
        <h2>Smart Home Integration</h2>
        <p>Enhanced device control allows for complex routines described in natural language. Instead of programming specific commands, users can simply describe what they want: "make the house ready for movie night" triggers appropriate lighting, temperature, and entertainment settings.</p>
  
        <h2>Personalization</h2>
        <p>The AI learns individual preferences over time, adapting responses and suggestions based on usage patterns. Family members get personalized experiences through voice recognition.</p>
  
        <h2>Privacy Controls</h2>
        <p>Amazon emphasizes new privacy features including on-device processing for sensitive commands and granular controls over data sharing. Users can review and delete conversation history directly through voice commands.</p>
  
        <h2>Availability</h2>
        <p>The AI-powered Alexa rolls out to Echo devices starting December 2024, beginning with Echo Show and Echo Dot. Older devices will receive the update throughout Q1 2025.</p>
      `
    },
    {
      id: 9,
      title: "SpaceX Starship Successfully Completes First Orbital Refueling Test",
      author: "Dr. Amanda Foster",
      date: "2024-10-28",
      image: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800&h=600&fit=crop",
      category: "SPACE",
      featured: false,
      excerpt: "Historic achievement marks crucial milestone for NASA's Artemis moon missions and Mars colonization plans.",
      content: `
        <p>SpaceX has successfully demonstrated in-orbit refueling between two Starship vehicles, a critical technology required for deep space missions to the Moon and Mars. The test marks a major milestone in humanity's return to lunar exploration.</p>
  
        <h2>The Achievement</h2>
        <p>Two Starship vehicles autonomously docked in low Earth orbit and transferred 100 tons of liquid methane and oxygen propellant. The operation took 45 minutes and demonstrated the precision required for future Mars missions requiring multiple refueling operations.</p>
  
        <h2>Artemis Implications</h2>
        <p>NASA's Artemis program relies on Starship's refueling capability to land astronauts on the Moon. This successful test validates SpaceX's approach and keeps the 2026 lunar landing timeline on track.</p>
  
        <h2>Mars Mission Enabler</h2>
        <p>Orbital refueling is essential for Mars missions, which require significantly more propellant than can be launched in a single vehicle. SpaceX estimates 6-8 refueling flights will be needed per Mars mission.</p>
  
        <h2>Technical Challenges Overcome</h2>
        <p>The test addressed concerns about propellant behavior in microgravity, automated docking precision, and thermal management during transfer. All systems performed nominally throughout the operation.</p>
  
        <h2>Next Steps</h2>
        <p>SpaceX plans three additional refueling demonstrations before attempting a lunar orbit mission. The company aims to conduct its first crewed Starship flight in late 2025.</p>
      `
    },
    {
      id: 10,
      title: "Sony PlayStation 6 Specs Leaked: 8K Gaming at 120fps Target",
      author: "Chris Martinez",
      date: "2024-10-25",
      image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=600&fit=crop",
      category: "GAMING",
      featured: false,
      excerpt: "Industry insiders reveal ambitious specifications for Sony's next-generation console expected in 2027.",
      content: `
        <p>Leaked documents suggest Sony's PlayStation 6 will target native 8K gaming at 120fps, powered by a custom AMD chipset built on 2nm process technology. The console reportedly enters development phase this month.</p>
  
        <h2>Hardware Specifications</h2>
        <p>The PS6 allegedly features 32GB of unified GDDR7 memory, a GPU capable of 50 teraflops of performance, and a CPU based on AMD's Zen 6 architecture. Ray tracing performance is expected to be 10x faster than PS5.</p>
  
        <h2>Storage and Loading</h2>
        <p>Built-in 4TB PCIe 5.0 SSD promises loading times under 1 second for most games. The system supports external storage expansion up to 16TB with proprietary expansion cards.</p>
  
        <h2>VR Integration</h2>
        <p>The console will work seamlessly with a rumored PSVR 3 headset, supporting wireless connectivity and foveated rendering for enhanced performance in virtual reality games.</p>
  
        <h2>Backward Compatibility</h2>
        <p>Sony plans full backward compatibility with PS4 and PS5 games, with AI-enhanced upscaling to take advantage of the PS6's superior hardware capabilities.</p>
  
        <h2>Expected Launch</h2>
        <p>Industry analysts predict a late 2027 release window with pricing estimated between $599-$699 for the standard edition. Sony has not officially commented on these leaks.</p>
      `
    },
    {
        id: 11,
        title: "OpenAI Introduces ChatGPT 6.0 With Autonomous Workflow Engine",
        author: "Emily Harper",
        date: "2024-10-22",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&h=900&fit=crop",
        category: "AI",
        featured: true,
        excerpt: "ChatGPT 6.0 debuts with an autonomous workflow engine capable of executing multi-step tasks without human input.",
        content: `
          <p>OpenAI has officially released ChatGPT 6.0, a groundbreaking update that includes a fully autonomous workflow engine. This allows the model to plan, execute, and complete multi-step tasks such as research, report writing, coding, scheduling, and data analysis.</p>
      
          <h2>Autonomous Workflow Engine</h2>
          <p>The new engine can chain together complex tasks without requiring users to give step-by-step instructions. For example, users can request: "Create a marketing plan for a skincare brand and generate a three-slide pitch deck," and ChatGPT 6.0 manages all stages independently.</p>
      
          <h2>Real-Time Internet Mode</h2>
          <p>ChatGPT 6.0 introduces a real-time search system that pulls live data from verified sources, solving one of the biggest limitations of previous models.</p>
      
          <h2>Enterprise Features</h2>
          <p>Organizations can connect internal databases, APIs, and knowledge systems directly to ChatGPT. Admins can define workflow limits to prevent unauthorized actions.</p>
      
          <h2>Availability</h2>
          <p>The update rolls out to Pro and Enterprise users first, with free-tier access expected early 2025.</p>
        `
    },
    {
        id: 12,
        title: "Netflix Launches Interactive Series Powered by AI Storytelling",
        author: "Olivia Brooks",
        date: "2024-10-20",
        image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=1600&h=900&fit=crop",
        category: "ENTERTAINMENT",
        featured: false,
        excerpt: "Netflix reveals a new interactive series where viewers influence the plot using conversational AI.",
        content: `
          <p>Netflix has unveiled a first-of-its-kind interactive series where viewers can shape the storyline using natural language inputs powered by AI. The new series, called “Infinite Paths,” adapts in real-time based on viewer decisions.</p>
      
          <h2>How It Works</h2>
          <p>Using Netflix's embedded AI engine, viewers can make decisions like “talk to the suspect” or “sneak into the warehouse,” and the story regenerates seamless transitions.</p>
      
          <h2>Production Breakthrough</h2>
          <p>The company blended live-action footage with AI-generated scene variations to create up to 500 unique outcomes per episode.</p>
      
          <h2>Viewer Reception</h2>
          <p>Early testers describe the experience as “a blend between a movie and an open-world game.”</p>
      
          <h2>Global Launch</h2>
          <p>The first season launches globally on December 2, 2024.</p>
        `
    },
    {
        id: 13,
        title: "Intel Core Ultra Series Debuts With Hybrid Neural Processing Unit",
        author: "Mark Peterson",
        date: "2024-10-18",
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=1600&h=900&fit=crop",
        category: "HARDWARE",
        featured: false,
        excerpt: "Intel unveils Core Ultra chips designed for AI computing, blending CPU, GPU, and NPU on a unified architecture.",
        content: `
          <p>Intel has announced the Core Ultra series, its most significant CPU update in over a decade. The new chips introduce a hybrid neural processing unit (NPU) designed to accelerate AI workloads on laptops and desktops.</p>
      
          <h2>Unified Processing Architecture</h2>
          <p>The Ultra series integrates CPU, GPU, and NPU into a shared memory architecture for faster task switching and parallel execution.</p>
      
          <h2>Laptop Performance</h2>
          <p>Benchmarks show 40% faster AI model inference and 30% improved battery efficiency compared to the previous generation.</p>
      
          <h2>Developer Tools</h2>
          <p>Intel released an AI Software Suite allowing developers to deploy local models optimized for the new NPU.</p>
      
          <h2>Launch Schedule</h2>
          <p>Devices with Core Ultra processors hit the market in Spring 2025.</p>
        `
    },
    {
        id: 14,
        title: "YouTube Introduces Creator AI Studio With Auto-Edited Videos",
        author: "Hannah Lee",
        date: "2024-10-15",
        image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=1600&h=900&fit=crop",
        category: "SOCIAL MEDIA",
        featured: true,
        excerpt: "YouTube adds an AI studio that auto-edits full videos into Shorts, captions, and optimized thumbnails.",
        content: `
          <p>YouTube has launched Creator AI Studio, a suite of tools designed to automate video editing, thumbnail creation, and Shorts generation. The system uses viewer analytics to determine the best segments to highlight.</p>
      
          <h2>Auto-Editing Features</h2>
          <p>Creators can upload raw footage and let the AI detect key moments, remove awkward pauses, enhance audio, and apply templates.</p>
      
          <h2>Thumbnail Intelligence</h2>
          <p>The tool analyzes facial expressions, saturation, and click-through data to generate thumbnails with the highest engagement potential.</p>
      
          <h2>Shorts Generation</h2>
          <p>Long videos can be automatically chopped into vertical clips optimized for mobile engagement.</p>
        `
    },
    {
        id: 15,
        title: "Boeing Reveals Hydrogen-Powered Aircraft Prototype for 2030",
        author: "Jonathan Reid",
        date: "2024-10-12",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&h=900&fit=crop",
        category: "AVIATION",
        featured: false,
        excerpt: "Boeing showcases a hydrogen-powered aircraft prototype aimed at reducing emissions by 90%.",
        content: `
          <p>Boeing has revealed its first full-scale hydrogen-powered aircraft prototype. The company aims to reduce aviation emissions drastically by transitioning to hydrogen propulsion systems by 2030.</p>
      
          <h2>Hydrogen Efficiency</h2>
          <p>The aircraft uses cryogenic liquid hydrogen stored in insulated tanks that are 40% lighter than previous designs.</p>
      
          <h2>Flight Performance</h2>
          <p>Initial tests show a range of 1,100 miles on hydrogen fuel—ideal for short and mid-haul flights.</p>
      
          <h2>Environmental Impact</h2>
          <p>Boeing claims up to 90% emissions reduction compared to kerosene-based aircraft.</p>
      
          <h2>Commercial Timeline</h2>
          <p>The company expects limited commercial routes to begin in 2030.</p>
        `
    },
    {
        id: 16,
        title: "TikTok Shop Crosses $30 Billion in Annual Sales",
        author: "Grace Morgan",
        date: "2024-10-10",
        image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&h=900&fit=crop",
        category: "ECOMMERCE",
        featured: false,
        excerpt: "TikTok Shop continues explosive growth, surpassing $30B in global sales driven by influencers and AI recommendations.",
        content: `
          <p>TikTok Shop has crossed $30 billion in global annual sales, solidifying its position as one of the fastest-growing e-commerce platforms in the world.</p>
      
          <h2>Influencer Power</h2>
          <p>Over 60% of sales come from influencer-led livestreams across beauty, fashion, and tech categories.</p>
      
          <h2>AI Product Discovery</h2>
          <p>TikTok’s AI algorithm suggests products with remarkable accuracy based on browsing behavior, video watch time, and comment sentiment.</p>
      
          <h2>Global Expansion</h2>
          <p>New markets launching in 2025 include South Africa, Nigeria, and Brazil.</p>
        `
    },
    {
        id: 17,
        title: "NASA Confirms Water Ice Beneath Mars' Equator Surface",
        author: "Dr. Leonard Hayes",
        date: "2024-10-08",
        image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=1600&h=900&fit=crop",
        category: "SPACE",
        featured: true,
        excerpt: "NASA discovers massive water-ice reservoirs under Mars’ equator, reshaping future colonization plans.",
        content: `
          <p>NASA has confirmed the presence of large water-ice sheets buried just 12 meters beneath the Martian equator. This discovery dramatically changes the feasibility of long-term human habitation.</p>
      
          <h2>New Radar Technology</h2>
          <p>The Mars Reconnaissance Orbiter used upgraded radar sensors capable of detecting ice signatures with far higher resolution.</p>
      
          <h2>Colonization Impact</h2>
          <p>Equatorial ice means easier access for future missions since it avoids the extreme cold of the poles.</p>
      
          <h2>Next Steps</h2>
          <p>NASA plans two drilling missions in 2026 to confirm ice depth and purity.</p>
        `
    },
    {
        id: 18,
        title: "Uber Rolls Out Self-Driving Robotaxis in San Francisco",
        author: "Daniel Ortiz",
        date: "2024-10-06",
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1600&h=900&fit=crop",
        category: "AUTOMOTIVE",
        featured: false,
        excerpt: "Uber deploys fully autonomous robotaxis using hybrid lidar-plus-camera vehicles.",
        content: `
          <p>Uber has launched its first fleet of self-driving robotaxis in San Francisco, marking a major milestone in autonomous transportation.</p>
      
          <h2>Hybrid Sensor System</h2>
          <p>Unlike Tesla’s camera-only approach, Uber uses a combination of lidar and cameras for high-precision perception.</p>
      
          <h2>Safety Protocols</h2>
          <p>Each robotaxi includes redundant braking and steering systems, monitored remotely by trained operators.</p>
      
          <h2>Pricing</h2>
          <p>Rides cost 20% less than standard UberX fares.</p>
        `
    },
    {
        id: 19,
        title: "Valve Announces Steam Deck 2 With OLED Display and Faster APU",
        author: "Riley Summers",
        date: "2024-10-03",
        image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=1600&h=900&fit=crop",
        category: "GAMING",
        featured: true,
        excerpt: "Valve reveals Steam Deck 2 with 30% better performance, OLED display, and improved cooling.",
        content: `
          <p>Valve has officially announced Steam Deck 2, featuring a custom AMD APU and a vibrant OLED display for improved visuals and battery efficiency.</p>
      
          <h2>Performance Boost</h2>
          <p>The updated APU offers 30% more GPU performance and 25% better thermal stability.</p>
      
          <h2>Display Upgrade</h2>
          <p>The new 7.4-inch OLED panel supports HDR10+ and 110% DCI-P3 color accuracy.</p>
      
          <h2>Battery & Cooling</h2>
          <p>Redesigned heat pipes and a larger battery extend gameplay sessions by 2 hours.</p>
        `
    },
    {
        id: 20,
        title: "Adobe Premiere Pro Adds AI Scene Generator for Filmmakers",
        author: "Natalie Cruz",
        date: "2024-10-01",
        image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&h=900&fit=crop",
        category: "SOFTWARE",
        featured: false,
        excerpt: "Adobe adds an AI scene generator allowing filmmakers to create backgrounds, props, and lighting setups instantly.",
        content: `
          <p>Adobe has added a powerful AI Scene Generator to Premiere Pro, giving filmmakers the ability to create environments, props, and lighting setups directly from text prompts.</p>
      
          <h2>Film Production Leap</h2>
          <p>Directors can generate background plates, adjust lighting, and apply real-time depth effects without needing green screens.</p>
      
          <h2>Creator Tools</h2>
          <p>The tool blends generated scenes with live footage using depth-aware compositing.</p>
      
          <h2>Beta Access</h2>
          <p>Available now in Adobe Creative Cloud Beta, with full release in Q2 2025.</p>
        `
    },
      
  ];
  
export type Stories = typeof stories[0];
  
  // Helper functions
export const getRecentPosts = (count: number = 5) => {
    return [...stories]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, count);
};
  
export const getFeaturedPosts = (count: number = 5) => {
    return stories.filter(post => post.featured).slice(0, count);
};
  
export const getMissedPosts = () => {
    const recentIds = getRecentPosts(5).map(p => p.id);
    const featuredIds = getFeaturedPosts(5).map(p => p.id);
    const excludeIds = new Set([...recentIds, ...featuredIds]);
    
    return stories.filter(post => !excludeIds.has(post.id));
};
  
export const getAllPostsSorted = () => {
    return {
      latest: [...stories].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
      earliest: [...stories].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    };
};