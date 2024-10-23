const notebooks = [
    {
        id: 16,
        name: "MacBook Air M1",
        image: '/img/notebooks/macbook_air_m1.png',
        price: 8198.00,
        category: ["Notebook","Notebooks", "Apple", "MacBook", "PC"],
        description: "Apple notebook MacBook Air (de 13 polegadas, Processador M1 da Apple com CPU 8‑core e GPU 7‑core, 8 GB RAM, 256 GB) ",
        sales: 344,
    },
    {
        id: 17,
        name: "Acer Aspire 5 ",
        image: '/img/notebooks/aspire5.png',
        price: 2788.00,
        category: ["Notebook","Notebooks", "Acer", "Aspire", "PC"],
        description: "Notebook Acer Aspire5 A515-45-R36L AMD Ryzen7 5700U 12GB RAM (AMD Radeon) 512GB SSD 15.6” LED IPS Full HD Prata Teclado numérico Independente Linux",
        sales: 98
    },
    {
        id: 18,
        name: "Apple M2 Ultra",
        image: '/img/notebooks/m2ultra.png',
        price: 10599.00,
        category: ["Notebook","Notebooks", "Apple", "MacBook", "PC"],
        description: "Apple 2024 MacBook Air (de 13 polegadas, Chip M3 da Apple com CPU de oito núcleos e GPU de oito núcleos, 8GB Memória unificada, de 256 GB)",
        sales: 56
    },
    {
        id: 19,
        name: "Acer Swift 3 ",
        image: '/img/notebooks/swift3.png',
        price: 5299.00,
        category: ["Notebook","Notebooks", "Acer", "Swift", "PC"],
        description: "Acer Notebook Swift 3 SF314-511-566Z Intel® EVO Core™ i5–1135G7 da 11° Geração 16GB RAM 512GB SSD 14 LED Full HD IPS 60hz",
        sales: 9
    },
    {
        id: 20,
        name: "Dell XPS 13",
        image: '/img/notebooks/dell_xps13.png',
        price: 11379.00,
        category: ["Notebook","Notebooks", "Dell", "XPS", "PC"],
        description: "Notebook Dell XPS 13 X13-U7155H-M10 13.4 Full HD+, Intel® Core™ Ultra 7 16GB 512GB SSD Win 11",
        sales: 78,
    },
    {
        id: 21,
        name: "Galaxy Book 4 ",
        image: '/img/notebooks/book4.png',
        price: 2849.00,
        category: ["Notebook","Notebooks", "Samsung", "Galaxy Book", "PC"],
        description: "Notebook Samsung Galaxy Book4 i3 8GB 256 W11H",
        sales: 49
    },
    {
        id: 22,
        name: "Acer Nitro V15 ",
        image: '/img/notebooks/nitrov15.png',
        price: 5299.00,
        category: ["Notebook","Notebooks", "Acer", "Nitro", "PC"],
        description: "Notebook Acer Nitro V15 ANV15-51-58AZ 13ª Geração Intel Core i5-13420H, 8GB RAM, 512GB SSD, NVIDIA RTX 3050, 15.6 FHD LED IPS 144Hz, Windows 11",
        sales: 8
    },
    {
        id:23,
        name: "ASUS TUF Gaming F15",
        image: '/img/notebooks/tuf_F15.png',
        price: 4495.00,
        category: ["Notebook","Notebooks", "ASUS", "TUF Gaming", "PC"],
        description: "Notebook ASUS TUF Gaming F15, NVIDIA RTX3050, Intel Core I5, 8GB, 512GB, KeepOS, Tela de 15,6",
        sales: 12
    },
    {
        id:24,
        name: "Dell XPS-9300-A10S",
        image: '/img/notebooks/xps_9300.png',
        price: 9269.00,
        category: ["Notebook","Notebooks", "Dell", "XPS", "PC"],
        description: "Notebook Ultrafino Dell XPS-9300-A10S 10ª ger. Intel Core i5 8GB 512GB SSD Tela Full HD+ Windows 10 McAfee Garantia, Silver, 13.4 polegadas",
        sales: 15
    },
    {
        id: 25,
        name: "Acer Aspire 3",
        image: '/img/notebooks/aspire3.png',
        price: 2837.60,
        category: ["Notebook","Notebooks", "Acer", "Aspire", "PC"],
        description: "Notebook Acer Aspire 3 A315-510P-34XC Intel Core i3, 8GB RAM, 256GB SSD, 15.6” LED FULL HD, Windows 11",
        sales: 19
    },
    {
        id: 26,
        name: "Samsung Galaxy Book3",
        image: '/img/notebooks/book3.png',
        price: 4401.00,
        category: ["Notebook","Notebooks", "Samsung", "Galaxy Book", "PC"],
        description: "Samsung Galaxy Book3 360 Intel® Core™ i5-1335U, Windows 11 Home, 8 GB, 256 GB SSD, 13.3 Full HD AMOLED, 1.16 kg",
        sales: 100
    },
    {
        id: 27,
        name: "ASUS VivoBook Go 15",
        image: '/img/notebooks/vivo_go15.png',
        price: 2837.00,
        category: ["Notebook","Notebooks", "ASUS", "VivoBook", "PC"],
        description: "Notebook ASUS VivoBook Go 15, AMD RYZEN 5 7520U, 8GB, 256GB SSD, KeepOS, Tela 15,6 FHD",
        sales: 61
    },
    {
        id: 28,
        name: "Samsung Galaxy Book2",
        image: '/img/notebooks/book2.png',
        price: 3299.00,
        category: ["Notebook","Notebooks", "Samsung", "Galaxy Book", "PC"],
        description: "Galaxy Book2 Intel® Core™ i7-1255U, Windows 11 Home, 8GB, 256GB SSD, 15.6'' Full HD LED, 1.81kg.",
        sales: 32
    },
    {
        id: 29,
        name: "ASUS ROG Strix G16",
        image: '/img/notebooks/ROG_g16.png',
        price: 13499.00,
        category: ["Notebook","Notebooks", "ASUS", "ROG", "PC"],
        description: "Notebook Gamer ROG Strix G16, NVidia RTX4060, CORE I9, 16 GB, 512 GB, Windows 11 Home",
        sales: 58
    },
    {
        id: 30,
        name: "Apple MacBook M3 Pro",
        image: '/img/notebooks/apple_macbook_m3pro.png',
        price: 32999.99,
        category: ["Notebook","Notebooks", "Apple", "MacBook", "PC"],
        description: "Apple com chip M3 Pro, CPU de 12-core e GPU de 18-core: Tela Liquid Retina XDR de 16,2 pol, 36GB memória unificada e SSD 512GB. Funciona com o iPhone/iPad.",
        sales: 9
    },
]

export default notebooks;
