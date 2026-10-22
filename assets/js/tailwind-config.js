tailwind.config = {
    theme: {
        extend: {
            colors: {
                brand: {
                    bg: "#FDFBF7",
                    card: "#F8F4EF",
                    nude: "#F0E8DF",
                    rose: "#C28285",
                    "rose-hover": "#A96B6E",
                    accent: "#B06D70",
                    dark: "#2C2623",
                    muted: "#6B625C",
                    border: "#E8DFD5"
                }
            },
            fontFamily: {
                serif: ['"Cormorant Garamond"', "Georgia", "serif"],
                sans: ['"Plus Jakarta Sans"', "sans-serif"]
            },
            boxShadow: {
                soft: "0 10px 30px -10px rgba(44, 38, 35, 0.05)",
                floating: "0 20px 40px -15px rgba(194, 130, 133, 0.25)"
            }
        }
    }
};
