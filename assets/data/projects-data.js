export const projectsData = [
  {
    slug: "plantops",
    name: "PlantOps: Automated Plant Disease Monitoring & Analysis System",
    mood: "plantops",
    summary: "A compact ML operations build that connects image ingestion, inference, storage, analytics, reporting, and human review in one steady loop.",
    description: "PlantOps is designed as a systems project with clear handoffs, repeatable flow, and practical automation choices.",
    hero: {
      eyebrow: "Flagship · ML Systems",
      headline: "A plant health platform that connects ingestion, inference, storage, analytics, review, and reporting in one practical loop.",
      panelNote: "Flagship focus, architecture discipline, automation, and useful workflow design instead of isolated classifier output."
    },
    metadata: [
      { label: "Role", value: "ML and data systems builder across the full project lifecycle" },
      { label: "Timeline", value: "Iterative system build and refinement across pipeline, analytics, and review loop design" },
      { label: "Primary Outcome", value: "A structured operations concept for continuous disease monitoring, triage, and reporting" }
    ],
    tags: ["Computer Vision", "ML Systems", "Data Pipeline", "Analytics", "Human-in-the-Loop", "Automation"],
    deepDive: {
      challenge: "Plant checks can be manual and fragmented, so teams struggle to spot patterns early and triage uncertain cases quickly.",
      approach: "I treated PlantOps as a modular ML product with explicit stages, structured outputs, and automation hooks for repeatable operations.",
      result: "The result is a system blueprint and working project direction that supports operational monitoring, not one off predictions. The emphasis is reliable flow, traceability, and extensibility while keeping claims realistic."
    },
    process: {
      architecture: "Layered architecture: image ingestion, inference service, storage layer, analytics views, reporting outputs, and a reviewer feedback loop.",
      workflow: "Build order followed the pipeline rail: ingestion contracts, inference orchestration, persistence, analytics shaping, reporting, then review routing.",
      lessons: "Strong ML systems rely on operational design choices as much as model logic. Queue behavior, schema clarity, and exception handling determine whether the system remains usable as volume and complexity increase."
    },
    caseStudy: {
      problemFraming: "Plant disease management benefits from early detection, but teams need more than a prediction label. They need a consistent operational flow for triage, context, and follow through. PlantOps addresses this by framing diagnosis as a pipeline problem.",
      systemApproach: "PlantOps uses a blueprint-style layered architecture with explicit boundaries between ingestion, model inference, persistence, analytics computation, and human review. Each layer exposes structured outputs so monitoring and downstream automation stay reliable.",
      pipeline: [
        "Ingestion: receive image uploads with source and timestamp metadata.",
        "Inference: run disease classification and capture confidence output.",
        "Storage: persist raw images, predictions, and review states.",
        "Analytics: compute trend and confidence views for monitoring.",
        "Reporting: generate concise status summaries and exception alerts.",
        "Review loop: route uncertain cases for human validation and feedback."
      ],
      features: [
        "Automated ingestion-to-inference handoff with repeatable processing contracts.",
        "Rule-based queueing for uncertain predictions and priority condition routing.",
        "Scheduled reporting hooks for recurring health and exception summaries.",
        "Pipeline-friendly data structures intended for future orchestrator integration."
      ],
      analyticsMonitoring: "The analytics layer focuses on operational awareness: trend views for disease categories over time, confidence band monitoring, data freshness checks, and queue pressure visibility. The intent is to support decisions about model quality, intervention timing, and workflow health.",
      humanReviewLoop: "A dedicated review queue captures low-confidence or ambiguous cases for human validation. Reviewer feedback is preserved as structured annotations so it can improve labeling quality, guide threshold tuning, and inform future retraining cycles.",
      tools: [
        { label: "ML Inference", value: "Python-based CV inference pipeline with modular model stage boundaries" },
        { label: "Data Layer", value: "Structured storage approach for image artifacts, predictions, and analytics-ready outputs" },
        { label: "Analytics", value: "Python + SQL-style metric modeling for trend, confidence, and operational views" },
        { label: "Automation", value: "Event and schedule-oriented processing design for recurring monitoring/reporting tasks" },
        { label: "Interface", value: "Dashboard/review-oriented presentation model for triage and decision support" }
      ],
      learned: "I learned that practical ML value comes from dependable flow design, clear data contracts, and a review loop that keeps the system improving.",
      futureEvolution: "Next evolution paths include stronger active-learning workflows, richer alert policy controls, environment-specific deployment profiles, and expanded integrations for field operations and stakeholder reporting.",
      ctaButtons: [
        { label: "View GitHub", href: "https://github.com/jasgh14" },
        { label: "Download CV", href: "assets/JunaidAsgharCV.pdf" },
        { label: "Discuss PlantOps", href: "contact.html" }
      ]
    },
    links: { repo: "https://github.com/jasgh14" },
    cta: "If you are building ML systems that need monitoring, feedback loops, and robust pipeline design, I would be glad to discuss how PlantOps can be extended."
  },
  {
    slug: "real-time-visual-diagnosis",
    name: "Real-Time Visual Diagnosis System",
    mood: "diagnosis",
    summary: "A real time visual diagnosis workflow that combines detection, classification, and explainability in one operator friendly experience.",
    description: "A practical computer vision system designed to help users move from raw imagery to explainable diagnosis signals with minimal friction.",
    hero: {
      eyebrow: "Computer Vision",
      headline: "A real time diagnosis stack designed for interpretability, responsive feedback, and confident decisions.",
      panelNote: "Designed as an interactive diagnosis tool with responsive inference feedback, clear visual cues, and practical usability as a core requirement."
    },
    metadata: [
      { label: "Role", value: "End to end ML and application build across modelling, inference flow, and interface design" },
      { label: "Timeline", value: "Built iteratively from model prototyping to integrated real time workflow and interface refinement" },
      { label: "Primary Outcome", value: "A working diagnosis pipeline that combines detection, classification, and explainability in one usable interface" }
    ],
    tags: ["Computer Vision", "Real-Time Inference", "Explainable AI", "Interface Design"],
    deepDive: {
      challenge: "Many vision demos stop at static predictions, but practical diagnosis needs fast interaction, visual context, and understandable outputs. The core challenge was to deliver this in one coherent flow rather than separate scripts.",
      approach: "I structured the system as a connected pipeline with image or camera input, target localisation, disease classification, and explanation overlays. The interface was treated as part of the ML product so each prediction remained clear, traceable, and easy to review.",
      result: "The project delivered a complete real time diagnosis experience that surfaces model output alongside visual evidence. It moved the work from notebook style experimentation into a usable tool designed for applied decision support."
    },
    process: {
      architecture: "The architecture separates input handling, inference, explanation rendering, and UI presentation so each layer can be improved without destabilising the full workflow.",
      workflow: "Development progressed from core model validation to integrated inference orchestration, then interface tuning for clearer confidence display and faster interpretation during live use.",
      lessons: "The main trade off was balancing response speed with explanatory clarity. I learned to design for both technical output quality and human understanding from the start."
    },
    caseStudy: {
      problemFraming: "In image-heavy diagnosis workflows, users often face a gap between model output and actionable confidence. The project focused on reducing that gap with a live, interpretable interface instead of a raw prediction-only view.",
      systemApproach: "The system blends a detection stage for locating relevant visual regions, a classification stage for diagnosis categories, and an explainability layer to show why the model leans toward a given outcome. The UI was designed to keep these signals readable during live use.",
      pipeline: [
        "Frame ingestion from camera or queued image source.",
        "Region proposal and detection pass to isolate diagnostically relevant targets.",
        "Classification inference over selected regions.",
        "Explainability overlay generation for contextual model transparency.",
        "UI rendering with synchronized prediction, confidence cues, and visual annotations."
      ],
      features: [
        "Live visual overlays that keep model reasoning close to the image context.",
        "Integrated detection + classification flow to avoid tool switching.",
        "Readable confidence presentation focused on decision support rather than hype.",
        "Operator-friendly interface structure designed for quick interpretation."
      ],
      analyticsMonitoring: "The system surfaces prediction confidence and visual explanation cues directly in the diagnosis view, making outputs easier to inspect and compare during runtime checks.",
      humanReviewLoop: "Predictions are presented as assistive signals, not final authority. Users can review image context, confidence, and explanation overlays before accepting a diagnosis direction.",
      tools: [
        { label: "Detection", value: "YOLO-based object/region detection pipeline" },
        { label: "Classification", value: "PyTorch-driven disease/category classifier" },
        { label: "Explainability", value: "XAI overlays (e.g., saliency/attention-style visual cues)" },
        { label: "Application Layer", value: "Python desktop interface for real-time interaction" }
      ],
      learned: "I learned that model quality alone is not enough in applied ML products. Usability and interpretability choices directly affect whether people trust and adopt the system. I also learned to treat explainability outputs as communication artefacts, not technical add ons.",
      futureEvolution: "Next steps include stronger session level logging, structured feedback capture for difficult cases, and tighter calibration checks to improve consistency across varied plant imagery.",
      ctaButtons: [
        { label: "View Repository", href: "https://github.com/jasgh14/DiseaseDetection" },
        { label: "Download CV", href: "assets/JunaidAsgharCV.pdf" },
        { label: "Discuss Project", href: "contact.html" }
      ]
    },
    links: { repo: "https://github.com/jasgh14/DiseaseDetection", demo: "TODO: Add public demo link when shareable" },
    cta: "If you are exploring applied vision systems that need performance and interpretability, I can walk through design choices and trade offs from this build."
  },
  {
    slug: "ecommerce-analytics-platform",
    name: "E-commerce Analytics Platform",
    mood: "analytics",
    summary: "An analytics build that turns fragmented commerce data into dependable reporting views for day to day and strategic planning.",
    description: "Designed as a practical analytics product, with stable data shaping, clear KPI logic, and dashboard views built for commercial decisions.",
    hero: {
      eyebrow: "Data & Insights",
      headline: "An analytics layer that translates transaction level records into clear sales, product, and customer signals.",
      panelNote: "Built with a reporting first mindset, clarity, consistency, and traceable metric definitions over visual noise."
    },
    metadata: [
      { label: "Role", value: "Data Analyst / Analytics Engineer (project build)" },
      { label: "Timeline", value: "Iterative build across data preparation, metric modeling, and dashboard refinement" },
      { label: "Primary Outcome", value: "A reusable analytics workflow for consistent reporting and faster business review cycles" }
    ],
    tags: ["SQL", "Python", "Pandas", "AWS", "Power BI", "Business Intelligence"],
    deepDive: {
      challenge: "Operational commerce data often sits across multiple tables and granular event streams, which makes simple questions hard to answer consistently. The challenge was to create one reporting foundation where sales, product, and customer metrics align.",
      approach: "I structured the project around a repeatable ETL and semantic reporting model. I standardised core entities, validated joins and time logic, then exposed a curated dashboard layer with clear KPI definitions and drill down paths.",
      result: "The final output is a maintainable analytics workflow that supports recurring performance reviews and ad hoc investigation without rewriting queries each time. The emphasis was reliability and interpretability, not inflated claims."
    },
    process: {
      architecture: "Raw commerce records flow into cleaned analytical tables, then into a business-facing semantic layer used by dashboard pages. Each step isolates concerns: ingestion quality, metric modeling, and consumption.",
      workflow: "Started with requirement mapping (what decisions stakeholders need to make), followed by source profiling, transformation design, validation checks, and dashboard iteration sessions focused on readability.",
      lessons: "The most important lesson was that stakeholder trust depends on metric governance as much as technical execution. Naming, definitions, and filter behavior need the same rigor as the data pipeline itself."
    },
    caseStudy: {
      problemFraming: "Decision-makers needed dependable answers to recurring questions (what is selling, where margin pressure is appearing, and which customer segments are shifting) without manually reconciling spreadsheets or rewriting logic each reporting cycle.",
      systemApproach: "I treated the project as an internal analytics product. I defined consistent business logic first, implemented data shaping second, and designed interface views that surface trends, variance, and exceptions in a way that supports action.",
      pipeline: [
        "Ingest transaction, product, and customer datasets from source extracts.",
        "Apply SQL/Python cleaning to normalize identifiers, timestamps, and categorical values.",
        "Model analysis-ready tables for sales, basket behavior, and category performance.",
        "Run validation checks to protect KPI consistency across periods and filters.",
        "Publish curated datasets to dashboard views for recurring reporting and drill-down."
      ],
      features: [
        "Period-over-period sales and order trend breakdowns for structured performance reviews.",
        "Category and product-level contribution analysis to highlight mix shifts.",
        "Customer segmentation views that support retention and value-focused decision paths.",
        "Exception-oriented reporting patterns to surface outliers, not just averages."
      ],
      analyticsMonitoring: "The monitoring layer tracks KPI consistency, data freshness, and reporting anomalies so stakeholders can trust recurring decision workflows.",
      humanReviewLoop: "Human review occurs as business-user validation cycles where anomalies and KPI definitions are audited and refined before wider reporting adoption.",
      tools: [
        { label: "Querying", value: "SQL for transformation logic and analytical slicing" },
        { label: "Data Shaping", value: "Python + Pandas for cleaning, enrichment, and data quality checks" },
        { label: "Data Platform", value: "AWS-hosted storage/processing environment for structured workflows" },
        { label: "Reporting", value: "Power BI dashboards with reusable KPI definitions and filters" }
      ],
      learned: "I learned to design analytics outputs as practical systems, not static reports. Clear metric contracts, thoughtful drill paths, and interface discipline are what turn data work into real utility.",
      futureEvolution: "Future evolution includes expanded forecasting modules, scenario analysis views, and richer self-serve exploration with governed metric definitions.",
      ctaButtons: [
        { label: "View GitHub", href: "https://github.com/jasgh14" },
        { label: "Download CV", href: "assets/JunaidAsgharCV.pdf" },
        { label: "Discuss Project", href: "contact.html" }
      ]
    },
    links: { repo: "https://github.com/jasgh14", demo: "TODO: Add verified dashboard link if publicly shareable." },
    cta: "If you need a practical analytics layer for pricing, assortment, and performance decisions, I can walk through the modelling and dashboard approach used here."
  }
];
