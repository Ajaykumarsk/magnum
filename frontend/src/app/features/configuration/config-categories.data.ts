export interface SubMasterConfig {
    id: string;
    title: string;
    description: string;
    icon: string;
    customRoute?: string;
}

export interface CategoryConfig {
    id: string;
    title: string;
    subtitle: string;
    icon: string;
    iconBgClass: string;
    iconColorClass: string;
    subMasters: SubMasterConfig[];
}

export const CONFIG_CATEGORIES: CategoryConfig[] = [
    {
        id: 'resource',
        title: 'Resource',
        subtitle: 'Shift • Compliance • Agency • Department • Designation',
        icon: 'pi pi-clock',
        iconBgClass: 'bg-blue-100 dark:bg-blue-900/30',
        iconColorClass: 'text-blue-600 dark:text-blue-400',
        subMasters: [
            { id: 'department', title: 'Department', description: 'Company departments & operational units', icon: 'pi pi-sitemap' },
            { id: 'designation', title: 'Designation', description: 'Employee job titles & designations', icon: 'pi pi-id-card' },
            { id: 'skillmatrix', title: 'Skill Matrix', description: 'Skills matrix & technical competencies', icon: 'pi pi-star' },
            { id: 'division', title: 'Division', description: 'Business divisions & sectors', icon: 'pi pi-building' },
            { id: 'employeetype', title: 'Employee Type', description: 'Full-time, Contract, Trainee types', icon: 'pi pi-users' },
            { id: 'shift', title: 'Shift Config', description: 'Shift timings, OT & grace periods', icon: 'pi pi-clock' },
            { id: 'compliance', title: 'Compliance Checklist', description: 'Statutory licenses & renewal tracking', icon: 'pi pi-shield', customRoute: '/configuration/resource/compliance' },
            { id: 'agency', title: 'Agency Config', description: 'Contractor agencies & lease validity', icon: 'pi pi-briefcase' },
            { id: 'holidays', title: 'Holidays', description: 'Public & company holiday calendar', icon: 'pi pi-calendar' },
            { id: 'weeklyoff', title: 'Weekly Off', description: 'Weekly off days schedule', icon: 'pi pi-calendar-plus' },
            { id: 'device', title: 'Device Config', description: 'Biometric & RFID access readers', icon: 'pi pi-desktop' },
        ]
    },
    {
        id: 'canteen',
        title: 'Canteen',
        subtitle: 'Food Order • Food Utilization • Food Rate',
        icon: 'pi pi-shopping-bag',
        iconBgClass: 'bg-orange-100 dark:bg-orange-900/30',
        iconColorClass: 'text-orange-600 dark:text-orange-400',
        subMasters: [
            { id: 'food-order', title: 'Food Order', description: 'Meal ordering categories', icon: 'pi pi-shopping-cart' },
            { id: 'food-utilization', title: 'Food Utilization', description: 'Canteen utilization tracking', icon: 'pi pi-chart-bar' },
            { id: 'food-rate', title: 'Food Rate', description: 'Meal prices & rate lists', icon: 'pi pi-dollar' },
        ]
    },
    {
        id: 'visitor',
        title: 'Visitor',
        subtitle: 'Area • ID Proof • Visitor ID',
        icon: 'pi pi-user',
        iconBgClass: 'bg-purple-100 dark:bg-purple-900/30',
        iconColorClass: 'text-purple-600 dark:text-purple-400',
        subMasters: [
            { id: 'area', title: 'Area', description: 'Visitor access zones & areas', icon: 'pi pi-map-marker' },
            { id: 'id-proof', title: 'ID Proof', description: 'Acceptable identification documents', icon: 'pi pi-credit-card' },
            { id: 'visitor-id', title: 'Visitor ID', description: 'Visitor pass & card types', icon: 'pi pi-ticket' },
        ]
    },
    {
        id: 'machine-config',
        title: 'Machine Config',
        subtitle: 'Company • Location • Machine • More',
        icon: 'pi pi-cog',
        iconBgClass: 'bg-teal-100 dark:bg-teal-900/30',
        iconColorClass: 'text-teal-600 dark:text-teal-400',
        subMasters: [
            { id: 'company', title: 'Company', description: 'Enterprise company records', icon: 'pi pi-building' },
            { id: 'location', title: 'Location', description: 'Plant & facility locations', icon: 'pi pi-map' },
            { id: 'machine', title: 'Machine', description: 'Shopfloor machinery configuration', icon: 'pi pi-cog' },
        ]
    },
    {
        id: 'product',
        title: 'Product',
        subtitle: 'Product Grade • Category • BOM • Raw Material',
        icon: 'pi pi-box',
        iconBgClass: 'bg-emerald-100 dark:bg-emerald-900/30',
        iconColorClass: 'text-emerald-600 dark:text-emerald-400',
        subMasters: [
            { id: 'product-grade', title: 'Product Grade', description: 'Product quality grading scales', icon: 'pi pi-bookmark' },
            { id: 'product-category', title: 'Category', description: 'Hierarchical product classification', icon: 'pi pi-folder' },
            { id: 'bom', title: 'BOM', description: 'Bill of Materials configurations', icon: 'pi pi-list' },
            { id: 'raw-material', title: 'Raw Material', description: 'Raw material inventory masters', icon: 'pi pi-database' },
        ]
    },
    {
        id: 'crm',
        title: 'CRM',
        subtitle: 'Company • Bank • Customer • Terms • Billing',
        icon: 'pi pi-briefcase',
        iconBgClass: 'bg-rose-100 dark:bg-rose-900/30',
        iconColorClass: 'text-rose-600 dark:text-rose-400',
        subMasters: [
            { id: 'crm-company', title: 'CRM Company', description: 'Client & partner company details', icon: 'pi pi-building' },
            { id: 'bank', title: 'Bank', description: 'Corporate bank account configurations', icon: 'pi pi-wallet' },
            { id: 'customer', title: 'Customer', description: 'Customer directory & payment terms', icon: 'pi pi-users' },
            { id: 'payment-terms', title: 'Terms', description: 'Invoice & credit payment terms', icon: 'pi pi-file' },
            { id: 'billing-type', title: 'Billing', description: 'Billing cycle & invoice types', icon: 'pi pi-receipt' },
        ]
    },
    {
        id: 'cmms',
        title: 'CMMS',
        subtitle: 'Breakdown',
        icon: 'pi pi-wrench',
        iconBgClass: 'bg-indigo-100 dark:bg-indigo-900/30',
        iconColorClass: 'text-indigo-600 dark:text-indigo-400',
        subMasters: [
            { id: 'breakdown', title: 'Breakdown', description: 'Equipment failure & breakdown codes', icon: 'pi pi-exclamation-triangle' },
        ]
    },
    {
        id: 'quality',
        title: 'Quality',
        subtitle: 'QMS Tool Management • QMS Configuration • QMS Model',
        icon: 'pi pi-check-circle',
        iconBgClass: 'bg-pink-100 dark:bg-pink-900/30',
        iconColorClass: 'text-pink-600 dark:text-pink-400',
        subMasters: [
            { id: 'qms-tool', title: 'QMS Tool Management', description: 'Calibration & inspection tools', icon: 'pi pi-wrench' },
            { id: 'qms-config', title: 'QMS Configuration', description: 'Quality inspection parameters', icon: 'pi pi-sliders-h' },
            { id: 'qms-model', title: 'QMS Model', description: 'Standard quality inspection models', icon: 'pi pi-shield' },
        ]
    },
    {
        id: 'store',
        title: 'Store',
        subtitle: 'Store Location • Rack • Engineer Store',
        icon: 'pi pi-inbox',
        iconBgClass: 'bg-amber-100 dark:bg-amber-900/30',
        iconColorClass: 'text-amber-600 dark:text-amber-400',
        subMasters: [
            { id: 'store-location', title: 'Store Location', description: 'Warehouse & storage areas', icon: 'pi pi-compass' },
            { id: 'rack', title: 'Rack', description: 'Storage racks, bins & shelf slots', icon: 'pi pi-th-large' },
            { id: 'engineer-store', title: 'Engineer Store', description: 'Maintenance spares & engineer store', icon: 'pi pi-briefcase' },
        ]
    },
    {
        id: 'purchase',
        title: 'Purchase',
        subtitle: 'Supplier • Supplier Contact',
        icon: 'pi pi-shopping-cart',
        iconBgClass: 'bg-cyan-100 dark:bg-cyan-900/30',
        iconColorClass: 'text-cyan-600 dark:text-cyan-400',
        subMasters: [
            { id: 'supplier', title: 'Supplier', description: 'Vendor directory & ratings', icon: 'pi pi-truck' },
            { id: 'supplier-contact', title: 'Supplier Contact', description: 'Vendor primary contact persons', icon: 'pi pi-phone' },
        ]
    },
    {
        id: 'elearning',
        title: 'E-Learning',
        subtitle: 'Product • Multimedia • Documents • Tests',
        icon: 'pi pi-graduation-cap',
        iconBgClass: 'bg-sky-100 dark:bg-sky-900/30',
        iconColorClass: 'text-sky-600 dark:text-sky-400',
        subMasters: [
            { id: 'elearning-product', title: 'Product', description: 'Training courses & modules', icon: 'pi pi-book' },
            { id: 'multimedia', title: 'Multimedia', description: 'Video, audio & presentation media', icon: 'pi pi-video' },
            { id: 'document-type', title: 'Documents', description: 'Training document classifications', icon: 'pi pi-file-pdf' },
            { id: 'test', title: 'Tests', description: 'Assessment tests & quizzes', icon: 'pi pi-pencil' },
        ]
    },
    {
        id: 'email-config',
        title: 'Email',
        subtitle: 'Email Sender Config • Email Schedule • Email Send',
        icon: 'pi pi-envelope',
        iconBgClass: 'bg-violet-100 dark:bg-violet-900/30',
        iconColorClass: 'text-violet-600 dark:text-violet-400',
        subMasters: [
            { id: 'email-sender-config', title: 'Email Sender Config', description: 'SMTP hosts & credentials', icon: 'pi pi-send' },
            { id: 'email-schedule', title: 'Email Schedule', description: 'Scheduled email triggers & templates', icon: 'pi pi-clock' },
            { id: 'email-send', title: 'Email Send', description: 'Email transmission types', icon: 'pi pi-mail-forward' },
        ]
    },
    {
        id: 'role',
        title: 'Role',
        subtitle: 'Role',
        icon: 'pi pi-shield',
        iconBgClass: 'bg-slate-100 dark:bg-slate-900/30',
        iconColorClass: 'text-slate-600 dark:text-slate-400',
        subMasters: [
            { id: 'role', title: 'Role', description: 'User roles & system permissions', icon: 'pi pi-user-edit' },
        ]
    }
];