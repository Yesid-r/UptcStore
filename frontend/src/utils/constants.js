export const API_URL = 'http://localhost:3000'
export const navigation = {
    categories: [
        {
            id: 'categorias',
            name: 'Categorias',
            featured: [
                {
                    name: 'Nuevo',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
                    imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
                },
                {
                    name: 'Accesorios',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
                    imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
                },
            ],
            sections: [
                {
                    id: 'libreria',
                    name: 'Libreria',
                    items: [
                        { name: 'Ingenieria', href: '/ingenieria' },
                        { name: 'Administracion', href: '/administracion' },
                        { name: 'Finanzas', href: '/finanzas' },
                        { name: 'Contabilidad', href: '/contabilidad' },
                        { name: 'Browse All', href: '/all-libreria' },
                    ],
                },
                {
                    id: 'papeleria',
                    name: 'Papeleria',
                    items: [
                        { name: 'Esferos', href: '/esferos' },
                        { name: 'Agendas', href: '/agendas' },
                        { name: 'Cuadernos', href: '/cuadernos' },
                        { name: 'Libretas', href: '/libretas' },
                        { name: 'Browse All', href: '/all-papeleria' },
                    ],
                },
                {
                    id: 'ropa',
                    name: 'Ropa',
                    items: [
                      { name: 'Camisas', href: '/camisas' },
                      { name: 'Camisetas', href: '/camisetas' },
                      { name: 'Busos', href: '/busos' },
                      { name: 'Chaquetas', href: '/chaquetas' },
                      { name: 'Chalecos', href: '/chalecos' },
                      { name: 'Gorras', href: '/gorras' },
                      { name: 'Botas', href: '/botas' },
                      { name: 'Browse All', href: '/all-ropa' },
                    ],
                  },
                {
                    id: 'accesorios',
                    name: 'Accesorios',
                    items: [
                        { name: 'Bebidas', href: '/bebidas' },
                        { name: 'Bolsos', href: '/bolsos' },
                        { name: 'Llaveros', href: '/llaveros' },
                        { name: 'Canguros', href: '/canguros' },
                        { name: 'Oficina', href: '/oficina' },
                        { name: 'Paraguas', href: '/paraguas' },
                        { name: 'Browse All', href: '/all-paraguas' },
                    ],
                },
                
            ],
        }
    ],
    pages: [

    ],
}