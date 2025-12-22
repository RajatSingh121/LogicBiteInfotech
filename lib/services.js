export const SERVICES = [
    {
        id: 'custom-software-development',
        title: 'Custom Software Development',
        description: 'Scalable, robust software tailored to your specific business needs.',
        longDescription: `
# Custom Software Development

We build scalable, robust software tailored to your specific business needs using cutting-edge technologies. Our team of expert developers works closely with you to understand your unique requirements and deliver solutions that drive growth and efficiency.

## Our Process
1. **Discovery & Planning**: We analyze your business goals and technical requirements.
2. **Design & Prototyping**: We create intuitive UI/UX designs and interactive prototypes.
3. **Development**: We build the software using the latest tech stack (React, Node.js, Python, etc.).
4. **Testing & QA**: Rigorous testing ensures a bug-free and secure application.
5. **Deployment & Support**: We launch your software and provide ongoing maintenance.

## Key Features
-   **Scalability**: Built to grow with your business.
-   **Security**: Enterprise-grade security protocols.
-   **Performance**: Optimized for speed and reliability.
-   **Integration**: Seamless integration with existing systems.

## Why Choose Us?
We focus on delivering value through code. Our custom software solutions are designed to solve complex business problems and give you a competitive edge.
        `,
        price: 49999,
        icon: '💻'
    },
    {
        id: 'cloud-infrastructure',
        title: 'Cloud Infrastructure',
        description: 'Secure and scalable cloud solutions for your diverse needs.',
        longDescription: `
# Cloud Infrastructure Services

Secure and scalable cloud solutions helping you migrate, manage, and optimize your infrastructure. We partner with major cloud providers like AWS, Azure, and Google Cloud to deliver best-in-class services.

## Services Offered
-   **Cloud Migration**: Seamlessly move your on-premise applications to the cloud.
-   **Infrastructure Management**: 24/7 monitoring and management of your cloud resources.
-   **Cost Optimization**: Analyze and reduce your cloud spending.
-   **Security & Compliance**: Ensure your cloud environment meets industry standards.

## Benefits
-   **Flexibility**: Scale resources up or down as needed.
-   **Cost-Efficiency**: Pay only for what you use.
-   **Reliability**: High uptime and disaster recovery solutions.
        `,
        price: 29999,
        icon: '☁️'
    },
    {
        id: 'cybersecurity',
        title: 'Cybersecurity',
        description: 'Comprehensive security to protect your valuable data.',
        longDescription: `
# Cybersecurity Services

Comprehensive security assessments and implementation to protect your valuable data and assets. In an increasingly digital world, security is paramount. We help you stay ahead of threats.

## Our Approach
-   **Vulnerability Assessment**: Identify weaknesses in your systems.
-   **Penetration Testing**: Simulate attacks to test your defenses.
-   **Security Audits**: Comprehensive review of your security posture.
-   **Incident Response**: Rapid response to security breaches.

## Protection For
-   Web Applications
-   Network Infrastructure
-   Cloud Environments
-   Employee Devices
        `,
        price: 39999,
        icon: '🔒'
    },
    {
        id: 'data-analytics-ai',
        title: 'Data Analytics & AI',
        description: 'Turn your data into actionable insights with AI.',
        longDescription: `
# Data Analytics & AI

Turn your data into actionable insights with our advanced analytics and machine learning solutions. We help you unlock the true potential of your data to drive smarter decision-making.

## Solutions
-   **Business Intelligence**: Interactive dashboards and reports.
-   **Predictive Analytics**: Forecast trends and behaviors.
-   **Machine Learning**: Custom ML models for automation and optimization.
-   **Data Warehousing**: Centralized data storage for efficient analysis.

## Technologies
-   Python (Pandas, Scikit-learn)
-   TensorFlow / PyTorch
-   Tableau / Power BI
-   SQL / NoSQL Databases
        `,
        price: 59999,
        icon: '📊'
    },
    {
        id: 'mobile-app-development',
        title: 'Mobile App Development',
        description: 'Native and cross-platform mobile applications.',
        longDescription: `
# Mobile App Development

Native and cross-platform mobile applications that deliver exceptional user experiences. Whether you need an iOS app, an Android app, or a cross-platform solution using React Native or Flutter, we have you covered.

## Platforms
-   **iOS Development**: Swift / SwiftUI
-   **Android Development**: Kotlin / Java
-   **Cross-Platform**: React Native / Flutter

## Features
-   User-Centric Design
-   High Performance
-   Offline Capabilities
-   Push Notifications
        `,
        price: 44999,
        icon: '📱'
    },
    {
        id: 'it-consulting',
        title: 'IT Consulting',
        description: 'Strategic technology consulting for digital growth.',
        longDescription: `
# IT Consulting

Strategic technology consulting to help you navigate digital transformation and growth. We act as your trusted technology partner, guiding you through the complexities of the modern digital landscape.

## Focus Areas
-   **Digital Transformation**: Modernize your business processes.
-   **Technology Strategy**: Align tech with business goals.
-   **IT Audit**: Evaluate your current IT infrastructure.
-   **Software Selection**: Choose the right tools for your business.

## Why Consult With Us?
We bring years of industry experience and deep technical expertise to the table, helping you avoid costly mistakes and accelerate your success.
        `,
        price: 19999,
        icon: '🚀'
    }
];

export function getServiceById(id) {
    return SERVICES.find(service => service.id === id);
}
