export default {
    custom: {
        table: {
            style: {
                background: 'transparent',
                boxShadow: 'none !important'
            }
        },
        rows: {
            style: {
                position: 'unset !important',
                marginBottom: '10px',
                paddingBottom: "10px",
                paddingTop: "10px",
                borderRadius: "8px",
                boxShadow: '2px 2px 10px rgb(230,230,230)'
            },
        },
        headRow: {
            style: {
                borderRadius: "8px",
                marginBottom: '10px',
            },
        },
        headCells: {
            style: {
                padding: '15px 20px',
                fontSize: '0.9rem',
                fontWeight: 'bold',
            },
        },
        cells: {
            style: {
                padding: '15px 20px',
                fontSize: '0.9rem'
            },
        },
        pagination: {
            style: {
                borderRadius: "8px",
            }
        }
    },
    default: {
        table: {
            style: {
                background: 'transparent',
            }
        },
        rows: {
            style: {
                position: 'unset !important',
            },
        },
        headRow: {
            style: {
                borderRadius: "8px 8px 0 0",
            },
        },
        headCells: {
            style: {
                padding: '15px 20px',
                fontSize: '0.9rem',
                fontWeight: 'bold',
            },
        },
        cells: {
            style: {
                borderRadius: "8px",
                padding: '15px 20px',
                fontSize: '0.9rem'
            },
        },
        pagination: {
            style: {
                borderRadius: "0 0 8px 8px",
            }
        }
    }
}
