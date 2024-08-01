export default function InputLabel({ value, className = '', children, required = false, ...props }) {
    return (
        <label {...props} className={`block font-normal mb-2 text-sm text-gray-500 fw-medium` + className}>
            {value ? value : children}
            <span className="text-danger ms-1">{required ? '*' : null}</span>
        </label>
    );
}
