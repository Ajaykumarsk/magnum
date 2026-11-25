export interface ColumnConfig {
    field: string;
    header: string;
    type?: 'text' | 'number' | 'boolean' | 'date' | 'time' | 'dropdown' | 'textarea';
    sortable?: boolean;
    filterable?: boolean;
}

export interface FormFieldConfig {
    field: string;
    label: string;
    type: 'text' | 'number' | 'boolean' | 'date' | 'time' | 'dropdown' | 'textarea';
    required?: boolean;
    options?: { label: string; value: any }[];
    placeholder?: string;
    defaultValue?: any;
    helpText?: string;
}

export interface MasterConfig {
    id: string;
    title: string;
    apiEndpoint: string;
    columns: ColumnConfig[];
    formFields: FormFieldConfig[];
}

export const MASTER_METADATA: Record<string, MasterConfig> = {
    // --- Resource Category ---
    'resource/department': {
        id: 'department',
        title: 'Department Master',
        apiEndpoint: 'masters/resource/department',
        columns: [
            { field: 'code', header: 'Department Code', sortable: true, filterable: true },
            { field: 'name', header: 'Department Name', sortable: true, filterable: true },
            { field: 'created_at', header: 'Created At', type: 'date', sortable: true }
        ],
        formFields: [
            { field: 'code', label: 'Department Code', type: 'text', required: true, placeholder: 'e.g. DEPT-PROD' },
            { field: 'name', label: 'Department Name', type: 'text', required: true, placeholder: 'e.g. Production Department' }
        ]
    },
    'resource/designation': {
        id: 'designation',
        title: 'Designation Master',
        apiEndpoint: 'masters/resource/designation',
        columns: [
            { field: 'code', header: 'Designation Code', sortable: true, filterable: true },
            { field: 'name', header: 'Designation Name', sortable: true, filterable: true },
            { field: 'created_at', header: 'Created At', type: 'date', sortable: true }
        ],
        formFields: [
            { field: 'code', label: 'Designation Code', type: 'text', required: true, placeholder: 'e.g. DESG-ENG' },
            { field: 'name', label: 'Designation Name', type: 'text', required: true, placeholder: 'e.g. Senior Engineer' }
        ]
    },
    'resource/skillmatrix': {
        id: 'skillmatrix',
        title: 'Skill Matrix Master',
        apiEndpoint: 'masters/resource/skillmatrix',
        columns: [
            { field: 'code', header: 'Skill Code', sortable: true, filterable: true },
            { field: 'name', header: 'Skill Name', sortable: true, filterable: true },
            { field: 'created_at', header: 'Created At', type: 'date', sortable: true }
        ],
        formFields: [
            { field: 'code', label: 'Skill Code', type: 'text', required: true, placeholder: 'e.g. SKILL-CNC' },
            { field: 'name', label: 'Skill Name', type: 'text', required: true, placeholder: 'e.g. CNC Machine Operation' }
        ]
    },
    'resource/division': {
        id: 'division',
        title: 'Division Master',
        apiEndpoint: 'masters/resource/division',
        columns: [
            { field: 'code', header: 'Division Code', sortable: true, filterable: true },
            { field: 'name', header: 'Division Name', sortable: true, filterable: true },
            { field: 'created_at', header: 'Created At', type: 'date', sortable: true }
        ],
        formFields: [
            { field: 'code', label: 'Division Code', type: 'text', required: true, placeholder: 'e.g. DIV-NORTH' },
            { field: 'name', label: 'Division Name', type: 'text', required: true, placeholder: 'e.g. Northern Division' }
        ]
    },
    'resource/employeetype': {
        id: 'employeetype',
        title: 'Employee Type Master',
        apiEndpoint: 'masters/resource/employeetype',
        columns: [
            { field: 'code', header: 'Type Code', sortable: true, filterable: true },
            { field: 'name', header: 'Type Name', sortable: true, filterable: true },
            { field: 'created_at', header: 'Created At', type: 'date', sortable: true }
        ],
        formFields: [
            { field: 'code', label: 'Type Code', type: 'text', required: true, placeholder: 'e.g. EMP-FT' },
            { field: 'name', label: 'Type Name', type: 'text', required: true, placeholder: 'e.g. Full-Time Permanent' }
        ]
    },
    'resource/holidays': {
        id: 'holidays',
        title: 'Holiday Master',
        apiEndpoint: 'masters/resource/holidays',
        columns: [
            { field: 'code', header: 'Holiday Code', sortable: true, filterable: true },
            { field: 'name', header: 'Holiday Name', sortable: true, filterable: true },
            { field: 'holiday_type', header: 'Type', sortable: true },
            { field: 'holiday_date', header: 'Date', type: 'date', sortable: true }
        ],
        formFields: [
            { field: 'code', label: 'Holiday Code', type: 'text', required: true, placeholder: 'e.g. HOL-NY2025' },
            { field: 'name', label: 'Holiday Name', type: 'text', required: true, placeholder: 'e.g. New Year' },
            { field: 'holiday_type', label: 'Holiday Type', type: 'dropdown', required: true, options: [
                { label: 'Public Holiday', value: 'public' },
                { label: 'Restricted Holiday', value: 'restricted' },
                { label: 'Company Holiday', value: 'company' },
                { label: 'Optional Holiday', value: 'optional' }
            ]},
            { field: 'holiday_date', label: 'Date', type: 'date', required: true }
        ]
    },
    'resource/weeklyoff': {
        id: 'weeklyoff',
        title: 'Weekly Off Master',
        apiEndpoint: 'masters/resource/weeklyoff',
        columns: [
            { field: 'Weekly_off', header: 'Off Pattern Name', sortable: true, filterable: true },
            { field: 'day', header: 'Day of Week', sortable: true, filterable: true }
        ],
        formFields: [
            { field: 'Weekly_off', label: 'Off Pattern Name', type: 'text', required: true, placeholder: 'e.g. Standard Sunday Off' },
            { field: 'day', label: 'Day', type: 'dropdown', required: true, options: [
                { label: 'Monday', value: 'monday' },
                { label: 'Tuesday', value: 'tuesday' },
                { label: 'Wednesday', value: 'wednesday' },
                { label: 'Thursday', value: 'thursday' },
                { label: 'Friday', value: 'friday' },
                { label: 'Saturday', value: 'saturday' },
                { label: 'Sunday', value: 'sunday' }
            ]}
        ]
    },
    'resource/agency': {
        id: 'agency',
        title: 'Agency Master',
        apiEndpoint: 'masters/resource/agency',
        columns: [
            { field: 'code', header: 'Agency Code', sortable: true, filterable: true },
            { field: 'name', header: 'Agency Name', sortable: true, filterable: true },
            { field: 'plant_location', header: 'Plant Location', sortable: true },
            { field: 'is_agreement_expired', header: 'Agreement Expired', type: 'boolean' }
        ],
        formFields: [
            { field: 'code', label: 'Agency Code', type: 'text', required: true },
            { field: 'name', label: 'Agency Name', type: 'text', required: true },
            { field: 'address', label: 'Address', type: 'textarea' },
            { field: 'plant_location', label: 'Plant Location', type: 'text' },
            { field: 'epfo_number', label: 'EPFO Number', type: 'text' },
            { field: 'esic_registration', label: 'ESIC Registration', type: 'text' },
            { field: 'valid_from', label: 'Valid From', type: 'date' },
            { field: 'valid_to', label: 'Valid To', type: 'date' },
            { field: 'is_agreement_expired', label: 'Agreement Expired', type: 'boolean' }
        ]
    },
    'resource/device': {
        id: 'device',
        title: 'Device Master',
        apiEndpoint: 'masters/resource/device',
        columns: [
            { field: 'code', header: 'Device Code', sortable: true, filterable: true },
            { field: 'name', header: 'Device Name', sortable: true, filterable: true },
            { field: 'device_type', header: 'Device Type', sortable: true },
            { field: 'breakdown', header: 'In Breakdown', type: 'boolean' }
        ],
        formFields: [
            { field: 'code', label: 'Device Code', type: 'text', required: true },
            { field: 'name', label: 'Device Name', type: 'text', required: true },
            { field: 'controller_id', label: 'Controller ID', type: 'text' },
            { field: 'device_id', label: 'Device ID', type: 'text' },
            { field: 'device_type', label: 'Device Type', type: 'dropdown', options: [
                { label: 'Biometric', value: 'biometric' },
                { label: 'RFID Reader', value: 'rfid' },
                { label: 'Face Recognition', value: 'face' },
                { label: 'Card Reader', value: 'card' }
            ]},
            { field: 'breakdown', label: 'Breakdown Status', type: 'boolean' }
        ]
    },
    'resource/shift': {
        id: 'shift',
        title: 'Shift Master',
        apiEndpoint: 'masters/resource/shift',
        columns: [
            { field: 'code', header: 'Shift Code', sortable: true, filterable: true },
            { field: 'name', header: 'Shift Name', sortable: true, filterable: true },
            { field: 'start_time', header: 'Start Time', sortable: true },
            { field: 'end_time', header: 'End Time', sortable: true },
            { field: 'is_active', header: 'Active', type: 'boolean' }
        ],
        formFields: [
            { field: 'code', label: 'Shift Code', type: 'text', required: true },
            { field: 'name', label: 'Shift Name', type: 'text', required: true },
            { field: 'start_time', label: 'Start Time', type: 'time' },
            { field: 'end_time', label: 'End Time', type: 'time' },
            { field: 'late_entry_grace', label: 'Late Entry Grace (mins)', type: 'number' },
            { field: 'early_exit_grace', label: 'Early Exit Grace (mins)', type: 'number' },
            { field: 'is_active', label: 'Active', type: 'boolean', defaultValue: true }
        ]
    },

    // --- Canteen Category ---
    'canteen/food-order': {
        id: 'food-order',
        title: 'Food Order Master',
        apiEndpoint: 'masters/canteen/food-order',
        columns: [
            { field: 'code', header: 'Order Code', sortable: true, filterable: true },
            { field: 'name', header: 'Order Name', sortable: true, filterable: true },
            { field: 'description', header: 'Description' }
        ],
        formFields: [
            { field: 'code', label: 'Order Code', type: 'text', required: true },
            { field: 'name', label: 'Order Name', type: 'text', required: true },
            { field: 'description', label: 'Description', type: 'textarea' }
        ]
    },
    'canteen/food-utilization': {
        id: 'food-utilization',
        title: 'Food Utilization Master',
        apiEndpoint: 'masters/canteen/food-utilization',
        columns: [
            { field: 'code', header: 'Code', sortable: true, filterable: true },
            { field: 'name', header: 'Name', sortable: true, filterable: true },
            { field: 'description', header: 'Description' }
        ],
        formFields: [
            { field: 'code', label: 'Code', type: 'text', required: true },
            { field: 'name', label: 'Name', type: 'text', required: true },
            { field: 'description', label: 'Description', type: 'textarea' }
        ]
    },
    'canteen/food-rate': {
        id: 'food-rate',
        title: 'Food Rate Master',
        apiEndpoint: 'masters/canteen/food-rate',
        columns: [
            { field: 'food_item', header: 'Food Item', sortable: true, filterable: true },
            { field: 'meal_type', header: 'Meal Type', sortable: true },
            { field: 'rate', header: 'Rate (₹)', type: 'number', sortable: true },
            { field: 'effective_from', header: 'Effective From', type: 'date' },
            { field: 'is_active', header: 'Active', type: 'boolean' }
        ],
        formFields: [
            { field: 'food_item', label: 'Food Item', type: 'text', required: true },
            { field: 'meal_type', label: 'Meal Type', type: 'dropdown', required: true, options: [
                { label: 'Breakfast', value: 'breakfast' },
                { label: 'Lunch', value: 'lunch' },
                { label: 'Dinner', value: 'dinner' },
                { label: 'Snacks', value: 'snacks' }
            ]},
            { field: 'rate', label: 'Rate (₹)', type: 'number', required: true },
            { field: 'effective_from', label: 'Effective From Date', type: 'date', required: true },
            { field: 'is_active', label: 'Active', type: 'boolean', defaultValue: true }
        ]
    },

    // --- Visitor Category ---
    'visitor/area': {
        id: 'area',
        title: 'Area Master',
        apiEndpoint: 'masters/visitor/area',
        columns: [
            { field: 'code', header: 'Area Code', sortable: true, filterable: true },
            { field: 'name', header: 'Area Name', sortable: true, filterable: true },
            { field: 'is_restricted', header: 'Restricted Area', type: 'boolean' }
        ],
        formFields: [
            { field: 'code', label: 'Area Code', type: 'text', required: true },
            { field: 'name', label: 'Area Name', type: 'text', required: true },
            { field: 'description', label: 'Description', type: 'textarea' },
            { field: 'is_restricted', label: 'Restricted Area', type: 'boolean' }
        ]
    },
    'visitor/id-proof': {
        id: 'id-proof',
        title: 'ID Proof Master',
        apiEndpoint: 'masters/visitor/id-proof',
        columns: [
            { field: 'code', header: 'Code', sortable: true, filterable: true },
            { field: 'name', header: 'Document Name', sortable: true, filterable: true }
        ],
        formFields: [
            { field: 'code', label: 'Code', type: 'text', required: true },
            { field: 'name', label: 'Document Name', type: 'text', required: true }
        ]
    },
    'visitor/visitor-id': {
        id: 'visitor-id',
        title: 'Visitor ID Master',
        apiEndpoint: 'masters/visitor/visitor-id',
        columns: [
            { field: 'code', header: 'Badge Code', sortable: true, filterable: true },
            { field: 'name', header: 'Badge Title', sortable: true, filterable: true },
            { field: 'card_type', header: 'Card Type', sortable: true },
            { field: 'validity_hours', header: 'Validity (Hours)', type: 'number' }
        ],
        formFields: [
            { field: 'code', label: 'Badge Code', type: 'text', required: true },
            { field: 'name', label: 'Badge Title', type: 'text', required: true },
            { field: 'card_type', label: 'Card Type', type: 'dropdown', required: true, options: [
                { label: 'Temporary Pass', value: 'temporary' },
                { label: 'Recurring Vendor', value: 'recurring' },
                { label: 'VIP Pass', value: 'vip' }
            ]},
            { field: 'validity_hours', label: 'Validity Hours', type: 'number', required: true, defaultValue: 8 }
        ]
    },

    // --- Machine Config Category ---
    'machine-config/company': {
        id: 'company',
        title: 'Company Master',
        apiEndpoint: 'masters/machine-config/company',
        columns: [
            { field: 'code', header: 'Company Code', sortable: true, filterable: true },
            { field: 'name', header: 'Company Name', sortable: true, filterable: true },
            { field: 'phone', header: 'Phone' },
            { field: 'gst_number', header: 'GSTIN' },
            { field: 'is_active', header: 'Active', type: 'boolean' }
        ],
        formFields: [
            { field: 'code', label: 'Company Code', type: 'text', required: true },
            { field: 'name', label: 'Company Name', type: 'text', required: true },
            { field: 'phone', label: 'Phone', type: 'text' },
            { field: 'email', label: 'Email', type: 'text' },
            { field: 'gst_number', label: 'GST Number', type: 'text' },
            { field: 'address', label: 'Address', type: 'textarea' },
            { field: 'is_active', label: 'Active', type: 'boolean', defaultValue: true }
        ]
    },
    'machine-config/location': {
        id: 'location',
        title: 'Location Master',
        apiEndpoint: 'masters/machine-config/location',
        columns: [
            { field: 'code', header: 'Location Code', sortable: true, filterable: true },
            { field: 'name', header: 'Location Name', sortable: true, filterable: true },
            { field: 'company_name', header: 'Company' },
            { field: 'city', header: 'City', sortable: true },
            { field: 'state', header: 'State', sortable: true }
        ],
        formFields: [
            { field: 'code', label: 'Location Code', type: 'text', required: true },
            { field: 'name', label: 'Location Name', type: 'text', required: true },
            { field: 'city', label: 'City', type: 'text' },
            { field: 'state', label: 'State', type: 'text' },
            { field: 'pincode', label: 'Pincode', type: 'text' },
            { field: 'address', label: 'Address', type: 'textarea' },
            { field: 'is_active', label: 'Active', type: 'boolean', defaultValue: true }
        ]
    },
    'machine-config/machine': {
        id: 'machine',
        title: 'Machine Master',
        apiEndpoint: 'masters/machine-config/machine',
        columns: [
            { field: 'code', header: 'Machine Code', sortable: true, filterable: true },
            { field: 'name', header: 'Machine Name', sortable: true, filterable: true },
            { field: 'machine_type', header: 'Type', sortable: true },
            { field: 'model_number', header: 'Model No' },
            { field: 'is_active', header: 'Active', type: 'boolean' }
        ],
        formFields: [
            { field: 'code', label: 'Machine Code', type: 'text', required: true },
            { field: 'name', label: 'Machine Name', type: 'text', required: true },
            { field: 'machine_type', label: 'Type', type: 'dropdown', options: [
                { label: 'Production Machine', value: 'production' },
                { label: 'Utility Equipment', value: 'utility' },
                { label: 'Testing Instrument', value: 'testing' },
                { label: 'Packaging Unit', value: 'packaging' }
            ]},
            { field: 'manufacturer', label: 'Manufacturer', type: 'text' },
            { field: 'model_number', label: 'Model Number', type: 'text' },
            { field: 'serial_number', label: 'Serial Number', type: 'text' },
            { field: 'purchase_date', label: 'Purchase Date', type: 'date' },
            { field: 'is_active', label: 'Active', type: 'boolean', defaultValue: true }
        ]
    },

    // --- Product Category ---
    'product/product-grade': {
        id: 'product-grade',
        title: 'Product Grade Master',
        apiEndpoint: 'masters/product/product-grade',
        columns: [
            { field: 'code', header: 'Grade Code', sortable: true, filterable: true },
            { field: 'name', header: 'Grade Name', sortable: true, filterable: true },
            { field: 'description', header: 'Description' }
        ],
        formFields: [
            { field: 'code', label: 'Grade Code', type: 'text', required: true },
            { field: 'name', label: 'Grade Name', type: 'text', required: true },
            { field: 'description', label: 'Description', type: 'textarea' }
        ]
    },
    'product/product-category': {
        id: 'product-category',
        title: 'Product Category Master',
        apiEndpoint: 'masters/product/product-category',
        columns: [
            { field: 'code', header: 'Category Code', sortable: true, filterable: true },
            { field: 'name', header: 'Category Name', sortable: true, filterable: true },
            { field: 'parent_name', header: 'Parent Category' }
        ],
        formFields: [
            { field: 'code', label: 'Category Code', type: 'text', required: true },
            { field: 'name', label: 'Category Name', type: 'text', required: true },
            { field: 'description', label: 'Description', type: 'textarea' }
        ]
    },
    'product/bom': {
        id: 'bom',
        title: 'BOM Master',
        apiEndpoint: 'masters/product/bom',
        columns: [
            { field: 'code', header: 'BOM Code', sortable: true, filterable: true },
            { field: 'name', header: 'BOM Title', sortable: true, filterable: true },
            { field: 'product_name', header: 'Product Name', sortable: true },
            { field: 'version', header: 'Version' },
            { field: 'is_active', header: 'Active', type: 'boolean' }
        ],
        formFields: [
            { field: 'code', label: 'BOM Code', type: 'text', required: true },
            { field: 'name', label: 'BOM Title', type: 'text', required: true },
            { field: 'product_name', label: 'Product Name', type: 'text', required: true },
            { field: 'version', label: 'Version', type: 'text', defaultValue: '1.0' },
            { field: 'description', label: 'Notes', type: 'textarea' },
            { field: 'is_active', label: 'Active', type: 'boolean', defaultValue: true }
        ]
    },
    'product/raw-material': {
        id: 'raw-material',
        title: 'Raw Material Master',
        apiEndpoint: 'masters/product/raw-material',
        columns: [
            { field: 'code', header: 'Material Code', sortable: true, filterable: true },
            { field: 'name', header: 'Material Name', sortable: true, filterable: true },
            { field: 'unit', header: 'Unit' },
            { field: 'hsn_code', header: 'HSN Code' },
            { field: 'is_active', header: 'Active', type: 'boolean' }
        ],
        formFields: [
            { field: 'code', label: 'Material Code', type: 'text', required: true },
            { field: 'name', label: 'Material Name', type: 'text', required: true },
            { field: 'unit', label: 'Unit', type: 'dropdown', required: true, options: [
                { label: 'Kilogram (kg)', value: 'kg' },
                { label: 'Gram (g)', value: 'g' },
                { label: 'Litre (l)', value: 'l' },
                { label: 'Pieces (pcs)', value: 'pcs' },
                { label: 'Metre (m)', value: 'm' }
            ]},
            { field: 'hsn_code', label: 'HSN Code', type: 'text' },
            { field: 'gst_percentage', label: 'GST Rate (%)', type: 'number' },
            { field: 'is_active', label: 'Active', type: 'boolean', defaultValue: true }
        ]
    },

    // --- CRM Category ---
    'crm/crm-company': {
        id: 'crm-company',
        title: 'CRM Company Master',
        apiEndpoint: 'masters/crm/crm-company',
        columns: [
            { field: 'code', header: 'Client Code', sortable: true, filterable: true },
            { field: 'name', header: 'Client Name', sortable: true, filterable: true },
            { field: 'contact_person', header: 'Contact Person' },
            { field: 'phone', header: 'Phone' },
            { field: 'industry', header: 'Industry' }
        ],
        formFields: [
            { field: 'code', label: 'Client Code', type: 'text', required: true },
            { field: 'name', label: 'Company Name', type: 'text', required: true },
            { field: 'contact_person', label: 'Contact Person', type: 'text' },
            { field: 'phone', label: 'Phone', type: 'text' },
            { field: 'email', label: 'Email', type: 'text' },
            { field: 'industry', label: 'Industry', type: 'text' },
            { field: 'address', label: 'Address', type: 'textarea' },
            { field: 'is_active', label: 'Active', type: 'boolean', defaultValue: true }
        ]
    },
    'crm/bank': {
        id: 'bank',
        title: 'Bank Master',
        apiEndpoint: 'masters/crm/bank',
        columns: [
            { field: 'code', header: 'Bank Code', sortable: true, filterable: true },
            { field: 'name', header: 'Bank Name', sortable: true, filterable: true },
            { field: 'branch', header: 'Branch' },
            { field: 'ifsc_code', header: 'IFSC Code' }
        ],
        formFields: [
            { field: 'code', label: 'Bank Code', type: 'text', required: true },
            { field: 'name', label: 'Bank Name', type: 'text', required: true },
            { field: 'branch', label: 'Branch Name', type: 'text' },
            { field: 'ifsc_code', label: 'IFSC Code', type: 'text' },
            { field: 'account_number', label: 'Account Number', type: 'text' },
            { field: 'account_type', label: 'Account Type', type: 'dropdown', options: [
                { label: 'Current Account', value: 'current' },
                { label: 'Savings Account', value: 'savings' }
            ]}
        ]
    },
    'crm/customer': {
        id: 'customer',
        title: 'Customer Master',
        apiEndpoint: 'masters/crm/customer',
        columns: [
            { field: 'code', header: 'Customer Code', sortable: true, filterable: true },
            { field: 'name', header: 'Customer Name', sortable: true, filterable: true },
            { field: 'phone', header: 'Phone' },
            { field: 'credit_limit', header: 'Credit Limit (₹)', type: 'number' },
            { field: 'is_active', header: 'Active', type: 'boolean' }
        ],
        formFields: [
            { field: 'code', label: 'Customer Code', type: 'text', required: true },
            { field: 'name', label: 'Customer Name', type: 'text', required: true },
            { field: 'contact_person', label: 'Contact Person', type: 'text' },
            { field: 'phone', label: 'Phone', type: 'text' },
            { field: 'email', label: 'Email', type: 'text' },
            { field: 'credit_limit', label: 'Credit Limit (₹)', type: 'number' },
            { field: 'payment_terms_days', label: 'Payment Terms (Days)', type: 'number', defaultValue: 30 },
            { field: 'is_active', label: 'Active', type: 'boolean', defaultValue: true }
        ]
    },
    'crm/payment-terms': {
        id: 'payment-terms',
        title: 'Payment Terms Master',
        apiEndpoint: 'masters/crm/payment-terms',
        columns: [
            { field: 'code', header: 'Code', sortable: true, filterable: true },
            { field: 'name', header: 'Term Title', sortable: true, filterable: true },
            { field: 'days', header: 'Credit Days', type: 'number', sortable: true }
        ],
        formFields: [
            { field: 'code', label: 'Term Code', type: 'text', required: true },
            { field: 'name', label: 'Term Title', type: 'text', required: true },
            { field: 'days', label: 'Days', type: 'number', required: true },
            { field: 'description', label: 'Description', type: 'textarea' }
        ]
    },
    'crm/billing-type': {
        id: 'billing-type',
        title: 'Billing Type Master',
        apiEndpoint: 'masters/crm/billing-type',
        columns: [
            { field: 'code', header: 'Code', sortable: true, filterable: true },
            { field: 'name', header: 'Billing Type Name', sortable: true, filterable: true }
        ],
        formFields: [
            { field: 'code', label: 'Code', type: 'text', required: true },
            { field: 'name', label: 'Billing Type Name', type: 'text', required: true },
            { field: 'description', label: 'Description', type: 'textarea' }
        ]
    },

    // --- CMMS Category ---
    'cmms/breakdown': {
        id: 'breakdown',
        title: 'Breakdown Code Master',
        apiEndpoint: 'masters/cmms/breakdown',
        columns: [
            { field: 'code', header: 'Breakdown Code', sortable: true, filterable: true },
            { field: 'name', header: 'Breakdown Title', sortable: true, filterable: true },
            { field: 'severity', header: 'Severity', sortable: true },
            { field: 'estimated_downtime_minutes', header: 'Est. Downtime (mins)', type: 'number' }
        ],
        formFields: [
            { field: 'code', label: 'Breakdown Code', type: 'text', required: true },
            { field: 'name', label: 'Breakdown Title', type: 'text', required: true },
            { field: 'severity', label: 'Severity Level', type: 'dropdown', required: true, options: [
                { label: 'Low', value: 'low' },
                { label: 'Medium', value: 'medium' },
                { label: 'High', value: 'high' },
                { label: 'Critical', value: 'critical' }
            ]},
            { field: 'estimated_downtime_minutes', label: 'Est Downtime (Mins)', type: 'number' },
            { field: 'description', label: 'Cause/Description', type: 'textarea' }
        ]
    },

    // --- Quality Category ---
    'quality/qms-tool': {
        id: 'qms-tool',
        title: 'QMS Tool Management Master',
        apiEndpoint: 'masters/quality/qms-tool',
        columns: [
            { field: 'code', header: 'Tool Code', sortable: true, filterable: true },
            { field: 'name', header: 'Tool Name', sortable: true, filterable: true },
            { field: 'tool_type', header: 'Type' },
            { field: 'next_calibration_date', header: 'Next Calibration', type: 'date' },
            { field: 'is_active', header: 'Active', type: 'boolean' }
        ],
        formFields: [
            { field: 'code', label: 'Tool Code', type: 'text', required: true },
            { field: 'name', label: 'Tool Name', type: 'text', required: true },
            { field: 'tool_type', label: 'Tool Type', type: 'text' },
            { field: 'calibration_frequency_days', label: 'Calibration Frequency (Days)', type: 'number', defaultValue: 365 },
            { field: 'last_calibration_date', label: 'Last Calibration Date', type: 'date' },
            { field: 'next_calibration_date', label: 'Next Calibration Date', type: 'date' },
            { field: 'is_active', label: 'Active', type: 'boolean', defaultValue: true }
        ]
    },
    'quality/qms-config': {
        id: 'qms-config',
        title: 'QMS Configuration Master',
        apiEndpoint: 'masters/quality/qms-config',
        columns: [
            { field: 'code', header: 'Config Code', sortable: true, filterable: true },
            { field: 'name', header: 'Config Title', sortable: true, filterable: true },
            { field: 'parameter', header: 'Parameter', sortable: true },
            { field: 'value', header: 'Value' }
        ],
        formFields: [
            { field: 'code', label: 'Config Code', type: 'text', required: true },
            { field: 'name', label: 'Config Title', type: 'text', required: true },
            { field: 'parameter', label: 'Parameter Name', type: 'text', required: true },
            { field: 'value', label: 'Parameter Value', type: 'text' },
            { field: 'description', label: 'Description', type: 'textarea' }
        ]
    },
    'quality/qms-model': {
        id: 'qms-model',
        title: 'QMS Model Master',
        apiEndpoint: 'masters/quality/qms-model',
        columns: [
            { field: 'code', header: 'Model Code', sortable: true, filterable: true },
            { field: 'name', header: 'Model Name', sortable: true, filterable: true },
            { field: 'standard', header: 'Standard' },
            { field: 'version', header: 'Version' },
            { field: 'is_active', header: 'Active', type: 'boolean' }
        ],
        formFields: [
            { field: 'code', label: 'Model Code', type: 'text', required: true },
            { field: 'name', label: 'Model Name', type: 'text', required: true },
            { field: 'standard', label: 'Standard (e.g. ISO 9001)', type: 'text' },
            { field: 'version', label: 'Version', type: 'text' },
            { field: 'description', label: 'Description', type: 'textarea' },
            { field: 'is_active', label: 'Active', type: 'boolean', defaultValue: true }
        ]
    },

    // --- Store Category ---
    'store/store-location': {
        id: 'store-location',
        title: 'Store Location Master',
        apiEndpoint: 'masters/store/store-location',
        columns: [
            { field: 'code', header: 'Store Code', sortable: true, filterable: true },
            { field: 'name', header: 'Store Name', sortable: true, filterable: true },
            { field: 'warehouse_type', header: 'Warehouse Type', sortable: true },
            { field: 'is_active', header: 'Active', type: 'boolean' }
        ],
        formFields: [
            { field: 'code', label: 'Store Code', type: 'text', required: true },
            { field: 'name', label: 'Store Name', type: 'text', required: true },
            { field: 'warehouse_type', label: 'Warehouse Type', type: 'dropdown', options: [
                { label: 'Raw Material Warehouse', value: 'raw' },
                { label: 'Finished Goods Store', value: 'finished' },
                { label: 'Spare Parts Store', value: 'spare' },
                { label: 'General Warehouse', value: 'general' }
            ]},
            { field: 'capacity', label: 'Storage Capacity', type: 'text' },
            { field: 'is_active', label: 'Active', type: 'boolean', defaultValue: true }
        ]
    },
    'store/rack': {
        id: 'rack',
        title: 'Rack Master',
        apiEndpoint: 'masters/store/rack',
        columns: [
            { field: 'code', header: 'Rack Code', sortable: true, filterable: true },
            { field: 'name', header: 'Rack Name', sortable: true, filterable: true },
            { field: 'store_location_name', header: 'Store Location' },
            { field: 'row_number', header: 'Row' },
            { field: 'level', header: 'Level' }
        ],
        formFields: [
            { field: 'code', label: 'Rack Code', type: 'text', required: true },
            { field: 'name', label: 'Rack Name', type: 'text', required: true },
            { field: 'row_number', label: 'Row Number', type: 'text' },
            { field: 'level', label: 'Shelf Level', type: 'text' },
            { field: 'max_weight_kg', label: 'Max Weight Capacity (kg)', type: 'number' },
            { field: 'is_active', label: 'Active', type: 'boolean', defaultValue: true }
        ]
    },
    'store/engineer-store': {
        id: 'engineer-store',
        title: 'Engineer Store Master',
        apiEndpoint: 'masters/store/engineer-store',
        columns: [
            { field: 'code', header: 'Store Code', sortable: true, filterable: true },
            { field: 'name', header: 'Store Name', sortable: true, filterable: true },
            { field: 'is_active', header: 'Active', type: 'boolean' }
        ],
        formFields: [
            { field: 'code', label: 'Store Code', type: 'text', required: true },
            { field: 'name', label: 'Store Name', type: 'text', required: true },
            { field: 'description', label: 'Description', type: 'textarea' },
            { field: 'is_active', label: 'Active', type: 'boolean', defaultValue: true }
        ]
    },

    // --- Purchase Category ---
    'purchase/supplier': {
        id: 'supplier',
        title: 'Supplier Master',
        apiEndpoint: 'masters/purchase/supplier',
        columns: [
            { field: 'code', header: 'Vendor Code', sortable: true, filterable: true },
            { field: 'name', header: 'Supplier Name', sortable: true, filterable: true },
            { field: 'contact_person', header: 'Contact Person' },
            { field: 'phone', header: 'Phone' },
            { field: 'rating', header: 'Rating (out of 5)', type: 'number' },
            { field: 'is_active', header: 'Active', type: 'boolean' }
        ],
        formFields: [
            { field: 'code', label: 'Vendor Code', type: 'text', required: true },
            { field: 'name', label: 'Supplier Name', type: 'text', required: true },
            { field: 'contact_person', label: 'Contact Person', type: 'text' },
            { field: 'phone', label: 'Phone', type: 'text' },
            { field: 'email', label: 'Email', type: 'text' },
            { field: 'gst_number', label: 'GST Number', type: 'text' },
            { field: 'pan_number', label: 'PAN Number', type: 'text' },
            { field: 'payment_terms_days', label: 'Credit Terms (Days)', type: 'number', defaultValue: 30 },
            { field: 'rating', label: 'Rating (0 - 5)', type: 'number' },
            { field: 'address', label: 'Address', type: 'textarea' },
            { field: 'is_active', label: 'Active', type: 'boolean', defaultValue: true }
        ]
    },
    'purchase/supplier-contact': {
        id: 'supplier-contact',
        title: 'Supplier Contact Master',
        apiEndpoint: 'masters/purchase/supplier-contact',
        columns: [
            { field: 'name', header: 'Contact Person', sortable: true, filterable: true },
            { field: 'supplier_name', header: 'Supplier' },
            { field: 'designation', header: 'Designation' },
            { field: 'phone', header: 'Phone' },
            { field: 'is_primary', header: 'Primary Contact', type: 'boolean' }
        ],
        formFields: [
            { field: 'name', label: 'Contact Person Name', type: 'text', required: true },
            { field: 'designation', label: 'Designation', type: 'text' },
            { field: 'phone', label: 'Phone Number', type: 'text' },
            { field: 'email', label: 'Email Address', type: 'text' },
            { field: 'is_primary', label: 'Is Primary Contact', type: 'boolean' }
        ]
    },

    // --- E-Learning Category ---
    'elearning/elearning-product': {
        id: 'elearning-product',
        title: 'E-Learning Course Master',
        apiEndpoint: 'masters/elearning/elearning-product',
        columns: [
            { field: 'code', header: 'Course Code', sortable: true, filterable: true },
            { field: 'name', header: 'Course Title', sortable: true, filterable: true },
            { field: 'course_type', header: 'Course Type', sortable: true },
            { field: 'duration_hours', header: 'Duration (Hrs)', type: 'number' },
            { field: 'is_mandatory', header: 'Mandatory', type: 'boolean' },
            { field: 'is_active', header: 'Active', type: 'boolean' }
        ],
        formFields: [
            { field: 'code', label: 'Course Code', type: 'text', required: true },
            { field: 'name', label: 'Course Title', type: 'text', required: true },
            { field: 'course_type', label: 'Type', type: 'dropdown', options: [
                { label: 'Video Course', value: 'video' },
                { label: 'Document Course', value: 'document' },
                { label: 'Interactive Session', value: 'interactive' },
                { label: 'Assessment Only', value: 'assessment' }
            ]},
            { field: 'duration_hours', label: 'Duration in Hours', type: 'number' },
            { field: 'is_mandatory', label: 'Mandatory Training', type: 'boolean' },
            { field: 'description', label: 'Course Syllabus', type: 'textarea' },
            { field: 'is_active', label: 'Active', type: 'boolean', defaultValue: true }
        ]
    },
    'elearning/multimedia': {
        id: 'multimedia',
        title: 'Multimedia Type Master',
        apiEndpoint: 'masters/elearning/multimedia',
        columns: [
            { field: 'code', header: 'Media Code', sortable: true, filterable: true },
            { field: 'name', header: 'Media Title', sortable: true, filterable: true },
            { field: 'media_type', header: 'Format Type', sortable: true }
        ],
        formFields: [
            { field: 'code', label: 'Media Code', type: 'text', required: true },
            { field: 'name', label: 'Media Title', type: 'text', required: true },
            { field: 'media_type', label: 'Format Type', type: 'dropdown', required: true, options: [
                { label: 'Video (MP4)', value: 'video' },
                { label: 'Audio (MP3)', value: 'audio' },
                { label: 'Image', value: 'image' },
                { label: 'Presentation (PPT)', value: 'presentation' },
                { label: 'PDF Document', value: 'pdf' }
            ]},
            { field: 'description', label: 'Description', type: 'textarea' }
        ]
    },
    'elearning/document-type': {
        id: 'document-type',
        title: 'Document Type Master',
        apiEndpoint: 'masters/elearning/document-type',
        columns: [
            { field: 'code', header: 'Code', sortable: true, filterable: true },
            { field: 'name', header: 'Document Type Name', sortable: true, filterable: true }
        ],
        formFields: [
            { field: 'code', label: 'Code', type: 'text', required: true },
            { field: 'name', label: 'Document Type Name', type: 'text', required: true },
            { field: 'description', label: 'Description', type: 'textarea' }
        ]
    },
    'elearning/test': {
        id: 'test',
        title: 'Test Master',
        apiEndpoint: 'masters/elearning/test',
        columns: [
            { field: 'code', header: 'Test Code', sortable: true, filterable: true },
            { field: 'name', header: 'Test Title', sortable: true, filterable: true },
            { field: 'total_questions', header: 'Total Questions', type: 'number' },
            { field: 'passing_percentage', header: 'Pass Mark (%)', type: 'number' },
            { field: 'duration_minutes', header: 'Duration (Mins)', type: 'number' }
        ],
        formFields: [
            { field: 'code', label: 'Test Code', type: 'text', required: true },
            { field: 'name', label: 'Test Title', type: 'text', required: true },
            { field: 'total_questions', label: 'Total Questions', type: 'number', required: true },
            { field: 'passing_percentage', label: 'Passing %', type: 'number', required: true, defaultValue: 60 },
            { field: 'duration_minutes', label: 'Duration (Mins)', type: 'number', required: true, defaultValue: 30 },
            { field: 'max_attempts', label: 'Max Attempts Allowed', type: 'number', defaultValue: 3 },
            { field: 'is_active', label: 'Active', type: 'boolean', defaultValue: true }
        ]
    },

    // --- Email Category ---
    'email-config/email-sender-config': {
        id: 'email-sender-config',
        title: 'Email Sender Configuration Master',
        apiEndpoint: 'masters/email-config/email-sender-config',
        columns: [
            { field: 'code', header: 'Config Code', sortable: true, filterable: true },
            { field: 'name', header: 'Config Name', sortable: true, filterable: true },
            { field: 'smtp_host', header: 'SMTP Host', sortable: true },
            { field: 'sender_email', header: 'Sender Email' },
            { field: 'is_active', header: 'Active', type: 'boolean' }
        ],
        formFields: [
            { field: 'code', label: 'Config Code', type: 'text', required: true },
            { field: 'name', label: 'Config Name', type: 'text', required: true },
            { field: 'smtp_host', label: 'SMTP Host', type: 'text', required: true },
            { field: 'smtp_port', label: 'SMTP Port', type: 'number', required: true, defaultValue: 587 },
            { field: 'sender_email', label: 'Sender Email Address', type: 'text', required: true },
            { field: 'username', label: 'SMTP Username', type: 'text' },
            { field: 'use_tls', label: 'Use TLS Encryption', type: 'boolean', defaultValue: true },
            { field: 'use_ssl', label: 'Use SSL Encryption', type: 'boolean', defaultValue: false },
            { field: 'is_active', label: 'Active', type: 'boolean', defaultValue: true }
        ]
    },
    'email-config/email-schedule': {
        id: 'email-schedule',
        title: 'Email Schedule Master',
        apiEndpoint: 'masters/email-config/email-schedule',
        columns: [
            { field: 'code', header: 'Schedule Code', sortable: true, filterable: true },
            { field: 'name', header: 'Trigger Title', sortable: true, filterable: true },
            { field: 'frequency', header: 'Frequency', sortable: true },
            { field: 'is_active', header: 'Active', type: 'boolean' }
        ],
        formFields: [
            { field: 'code', label: 'Schedule Code', type: 'text', required: true },
            { field: 'name', label: 'Trigger Title', type: 'text', required: true },
            { field: 'frequency', label: 'Frequency', type: 'dropdown', required: true, options: [
                { label: 'Daily Automated', value: 'daily' },
                { label: 'Weekly Summary', value: 'weekly' },
                { label: 'Monthly Report', value: 'monthly' },
                { label: 'On Event Trigger', value: 'on_event' }
            ]},
            { field: 'subject_template', label: 'Email Subject Template', type: 'text' },
            { field: 'recipients', label: 'Recipients (Comma-separated)', type: 'textarea' },
            { field: 'body_template', label: 'Body Template (HTML/Text)', type: 'textarea' },
            { field: 'is_active', label: 'Active', type: 'boolean', defaultValue: true }
        ]
    },
    'email-config/email-send': {
        id: 'email-send',
        title: 'Email Send Master',
        apiEndpoint: 'masters/email-config/email-send',
        columns: [
            { field: 'code', header: 'Code', sortable: true, filterable: true },
            { field: 'name', header: 'Email Action Name', sortable: true, filterable: true },
            { field: 'is_active', header: 'Active', type: 'boolean' }
        ],
        formFields: [
            { field: 'code', label: 'Code', type: 'text', required: true },
            { field: 'name', label: 'Email Action Name', type: 'text', required: true },
            { field: 'description', label: 'Description', type: 'textarea' },
            { field: 'is_active', label: 'Active', type: 'boolean', defaultValue: true }
        ]
    },

    // --- Role Category ---
    'role/role': {
        id: 'role',
        title: 'Role Master',
        apiEndpoint: 'masters/role/role',
        columns: [
            { field: 'code', header: 'Role Code', sortable: true, filterable: true },
            { field: 'name', header: 'Role Name', sortable: true, filterable: true },
            { field: 'is_active', header: 'Active', type: 'boolean' }
        ],
        formFields: [
            { field: 'code', label: 'Role Code', type: 'text', required: true },
            { field: 'name', label: 'Role Name', type: 'text', required: true },
            { field: 'description', label: 'Role Description', type: 'textarea' },
            { field: 'is_active', label: 'Active Status', type: 'boolean', defaultValue: true }
        ]
    }
};