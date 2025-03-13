import React, { useState, useEffect } from "react";
import {
  ShoppingCartIcon,
  HeartIcon,
  SearchIcon,
  UserIcon,
  MenuIcon,
  XIcon,
  ChevronDownIcon,
  BellIcon,
  ShoppingBagIcon,
  LogInIcon,
  SettingsIcon,
  HelpCircleIcon,
  GlobeIcon,
  SunIcon,
  MoonIcon,
  ChevronRightIcon,
  TrashIcon,
  PackageIcon,
  WrenchIcon,
  CalendarIcon,
  PhoneIcon,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/Components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/Components/ui/sheet";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Separator } from "@/Components/ui/separator";
import { cn } from "@/lib/utils";
import { MapPin, Phone, Mail, Clock, Sun, Moon, Menu, X } from "lucide-react";
import "../../../css/app.css";
import { usePage, router } from "@inertiajs/react";

// Sample products for cart
const cartProducts = [
  {
    id: 1,
    name: "Casco Integral GT-Air II",
    price: 599.99,
    quantity: 1,
  },
  {
    id: 2,
    name: "Chaqueta de Cuero Alpinestars",
    price: 349.99,
    quantity: 1,
  },
  {
    id: 3,
    name: "Guantes Touring Gore-Tex",
    price: 89.99,
    quantity: 1,
  },
];

// Sample products for favorites
const favoriteProducts = [
  {
    id: 4,
    name: "Kawasaki Ninja ZX-10R",
    price: 16999.99,
  },
  {
    id: 5,
    name: "Botas Alpinestars SMX-6 V2",
    price: 229.99,
  },
];

const categories = [
  {
    title: "Productos",
    href: "#",
    description: "Estos son nuestros productos más relevantes",
    icon: <PackageIcon className="mr-2 h-4 w-4" />,
    subcategories: [
      { name: "Motor y transmisión", href: "#" },
      { name: "Frenos y suspensión", href: "#" },
      { name: "Neumáticos y ruedas", href: "#" },
      { name: "Sistema eléctrico", href: "#" },
      { name: "Accesorios y carrocería", href: "#" },
      { name: "Lubricantes y filtros", href: "#" },
      { name: "Ver más", href: "/home/partials/Products/TodoProductos" },
    ],
  },
  {
    title: "Servicios",
    href: "#",
    description: "Ofrecemos una amplia gama de servicios para tu motocicleta",
    icon: <WrenchIcon className="mr-2 h-4 w-4" />,
    subcategories: [
      { name: "Mantenimiento general", href: "#" },
      { name: "Reparación de motor y transmisión", href: "#" },
      { name: "Servicio de frenos y suspensión ", href: "#" },
      { name: "Sistema eléctrico y diagnóstico", href: "#" },
      { name: "Cambio y balanceo de neumáticos", href: "#" },
      { name: "Personalización y accesorios", href: "#" },
      { name: "Ver más", href: "#" }, // Opción "Ver más"
    ],
  },
  {
    title: "Reservas",
    href: "#",
    description: "Reserva tu cita para servicios",
    icon: <CalendarIcon className="mr-2 h-4 w-4" />,
    subcategories: [
      { name: "Reservar Citas", href: "/home/partials/Reservas/recervas" },
      { name: "Horarios Disponibles", href: "#" },
      { name: "Promociones", href: "#" },
      { name: "Agregar Reserva", href: "#" },
      { name: "Ver más", href: "#" },
    ],
  },
  {
    title: "Contactos",
    href: "#",
    description: "Ponte en contacto con nosotros para cualquier consulta",
    icon: <PhoneIcon className="mr-2 h-4 w-4" />,
    subcategories: [
      { name: "Ubicanos", href: "#" },
      { name: "Soporte", href: "#" },
      { name: "Correo Electrónico", href: "#" },
      { name: "Redes Sociales", href: "#" },
      { name: "Preguntas Frecuentes", href: "#" },
    ],
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

// Cart Item Component
const CartItem = ({ product, onRemove }: { product: any; onRemove: (id: number) => void }) => {
  return (
    <div className="flex items-start py-3 gap-3">
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium truncate">{product.name}</h4>
        <div className="flex items-center mt-1 text-sm text-muted-foreground">
          <span>{product.quantity} x ${product.price.toFixed(2)}</span>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground hover:text-destructive"
        onClick={() => onRemove(product.id)}
      >
        <TrashIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

// Favorite Item Component
const FavoriteItem = ({ product, onRemove }: { product: any; onRemove: (id: number) => void }) => {
  return (
    <div className="flex items-start py-3 gap-3">
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium truncate">{product.name}</h4>
        <div className="flex items-center mt-1 text-sm text-muted-foreground">
          <span>${product.price.toFixed(2)}</span>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground hover:text-destructive"
        onClick={() => onRemove(product.id)}
      >
        <TrashIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

// Función para obtener las iniciales del nombre y apellido
const getInitials = (user: any): string => {
  const firstName = user?.first_name || ""; // Cambiado a first_name
  const lastName = user?.last_name || ""; // Cambiado a last_name
  const firstInitial = firstName ? firstName[0].toUpperCase() : "";
  const lastInitial = lastName ? lastName[0].toUpperCase() : "";
  return `${firstInitial}${lastInitial}`;
};

export default function Header() {
  const { auth } = usePage().props;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(auth.user !== null);
  const [user, setUser] = useState<typeof auth.user | null>(auth.user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Cart and favorites state
  const [cart, setCart] = useState(cartProducts);
  const [favorites, setFavorites] = useState(favoriteProducts);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isCartSheetOpen, setIsCartSheetOpen] = useState(false);
  const [isFavoritesSheetOpen, setIsFavoritesSheetOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  // Calculate totals
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const favoritesCount = favorites.length;
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  // Remove item from cart
  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };
  // Remove item from favorites
  const removeFromFavorites = (id: number) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  // Manejar el efecto de desplazamiento con debounce
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determinar si se está desplazando hacia arriba o hacia abajo
      const scrollingDown = currentScrollY > lastScrollY;

      // Aplicar el efecto de fondo cuando se desplaza más de 50px
      setIsScrolled(currentScrollY > 50);

      // Controlar la visibilidad de la barra superior con histéresis
      // Solo ocultarla cuando se desplaza hacia abajo Y ha pasado los 120px
      // Solo mostrarla cuando se desplaza hacia arriba Y está antes de los 80px
      if (scrollingDown && currentScrollY > 120) {
        setIsVisible(false);
      } else if (!scrollingDown && currentScrollY < 80) {
        setIsVisible(true);
      }

      // Actualizar la última posición de desplazamiento
      setLastScrollY(currentScrollY);
    };

    // Usar throttle para evitar demasiadas actualizaciones
    let timeoutId: number | null = null;
    const throttledScroll = () => {
      if (timeoutId === null) {
        timeoutId = window.setTimeout(() => {
          handleScroll();
          timeoutId = null;
        }, 100); // 100ms de throttle
      }
    };

    window.addEventListener("scroll", throttledScroll);
    return () => {
      window.removeEventListener("scroll", throttledScroll);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [lastScrollY]);

  // Alternar el modo oscuro
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };
  // Alternar la barra de búsqueda
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    router.post("/logout", {}, {
      onSuccess: () => {
        setIsAuthenticated(false);
        setUser(null);
        router.visit('/'); // Redirigir a la página principal
      },
    });
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm border-b" : "bg-background"
      )}
    >
      {/* Barra superior */}
      <div
        className={cn(
          "bg-[#10192e] text-white transition-all duration-300",
          isVisible ? "py-1" : "max-h-0 py-0 opacity-0 overflow-hidden"
        )}
      >
        <div className="max-w-screen-xl mx-auto px-4 md:px-6">
          {/* Vista de escritorio */}
          <div className="hidden md:flex justify-between items-center h-6">
            {/* Ubicación */}
            <a
              href="https://maps.app.goo.gl/aihry7fG7kKrb5xp6"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-400 transition"
              aria-label="Ver ubicación en Google Maps"
            >
              <MapPin className="h-3 w-3 text-blue-500" />
              <span className="text-xs">Cusco, Perú</span>
            </a>
            {/* Información de contacto */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 transition" aria-label="Número de teléfono">
                <Phone className="h-3 w-3 text-red-500" />
                <span className="text-xs">+51 997 205 032</span>
              </div>
              <a
                href="mailto:rogeralfarohuaman@gmail.com"
                className="flex items-center gap-2 hover:text-blue-400 transition"
                aria-label="Enviar correo electrónico"
              >
                <Mail className="h-3 w-3 text-blue-500" />
                <span className="text-xs">rogeralfarohuaman@gmail.com</span>
              </a>
              <div className="flex items-center gap-2" aria-label="Horario de atención">
                <Clock className="h-3 w-3 text-red-500" />
                <span className="text-xs">Lun - Dom: 8:00 AM - 7:00 PM</span>
              </div>
            </div>
            {/* Alternar tema */}
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full bg-[#1b2a4e] text-white hover:bg-[#4c5c96] transition-all p-1"
              onClick={toggleDarkMode}
              aria-label={isDarkMode ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
            >
              {isDarkMode ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
            </Button>
          </div>

          {/* Vista móvil */}
          <div className="md:hidden">
            <div className="flex justify-between items-center h-6">
              <a
                href="https://maps.app.goo.gl/aihry7fG7kKrb5xp6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-blue-400 transition"
                aria-label="Ver ubicación en Google Maps"
              >
                <MapPin className="h-3 w-3 text-blue-500" />
                <span className="text-xs truncate max-w-20">Cusco, Perú</span>
              </a>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full bg-[#1b2a4e] text-white hover:bg-[#4c5c96] p-1"
                  onClick={toggleDarkMode}
                  aria-label={isDarkMode ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
                >
                  {isDarkMode ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full bg-[#1b2a4e] text-white hover:bg-[#4c5c96] p-1"
                  onClick={toggleMobileMenu}
                  aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                >
                  {isMobileMenuOpen ? <X className="h-3 w-3" /> : <Menu className="h-3 w-3" />}
                </Button>
              </div>
            </div>

            {/* Menú móvil con toda la información de contacto */}
            <div
              className={cn(
                "space-y-2 transition-all duration-300 overflow-hidden",
                isMobileMenuOpen ? "max-h-32 opacity-100 py-2" : "max-h-0 opacity-0 py-0"
              )}
            >
              <div className="flex items-center gap-2" aria-label="Número de teléfono">
                <Phone className="h-3 w-3 text-red-500" />
                <span className="text-xs">+51 999 333 666</span>
              </div>

              <a
                href="mailto:rogeralfarohuaman@gmail.com"
                className="flex items-center gap-2 hover:text-blue-400 transition"
                aria-label="Enviar correo electrónico"
              >
                <Mail className="h-3 w-3 text-blue-500" />
                <span className="text-xs break-all">rogeralfarohuaman@gmail.com</span>
              </a>

              <div className="flex items-center gap-2" aria-label="Horario de atención">
                <Clock className="h-3 w-3 text-red-500" />
                <span className="text-xs">Lun - Dom: 8:00 AM - 7:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navegación principal */}
      <div className="w-full max-w-[2000px] mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Menú móvil */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="mr-2">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px] overflow-y-auto max-h-screen">
              <SheetHeader>
                <SheetTitle>Menú</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <div className="space-y-4">
                  {categories.map((category) => (
                    <div key={category.title} className="space-y-2">
                      <div className="flex items-center font-medium text-lg">
                        {category.icon}
                        <span>{category.title}</span>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-2 gap-2 pl-2">
                        {category.subcategories.map((subcategory) => (
                          <a
                            key={subcategory.name}
                            href={subcategory.href}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                          >
                            {subcategory.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <a href="#" className="flex items-center py-2 text-foreground hover:text-primary transition-colors">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Cuenta</span>
                  </a>
                  <button
                    className="w-full flex items-center py-2 text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsFavoritesSheetOpen(true)}
                  >
                    <HeartIcon className="mr-2 h-4 w-4" />
                    <span>Favoritos</span>
                    {favoritesCount > 0 && (
                      <Badge variant="secondary" className="ml-auto">
                        {favoritesCount}
                      </Badge>
                    )}
                  </button>
                  <button
                    className="w-full flex items-center py-2 text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsCartSheetOpen(true)}
                  >
                    <ShoppingBagIcon className="mr-2 h-4 w-4" />
                    <span>Carrito</span>
                    {cartCount > 0 && (
                      <Badge variant="secondary" className="ml-auto">
                        {cartCount}
                      </Badge>
                    )}
                  </button>
                  <a href="#" className="flex items-center py-2 text-foreground hover:text-primary transition-colors">
                    <HelpCircleIcon className="mr-2 h-4 w-4" />
                    <span>Ayuda</span>
                  </a>
                </div>
              </div>
              <SheetFooter>
                <Button className="w-full" asChild>
                  <a href="/auth/login">
                    {isAuthenticated ? "Cerrar Sesión" : "Iniciar Sesión"}
                  </a>
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="ml-2 text-xl font-bold hidden sm:inline-block">Rudolf Motors</span>
            </a>
          </div>

          {/* Navegación del escritorio */}
          <div className="hidden md:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                {categories.map((category) => (
                  <NavigationMenuItem key={category.title}>
                    <NavigationMenuTrigger className="flex items-center">
                      {category.icon}
                      <span>{category.title}</span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[600px] grid-cols-2 gap-3 p-4">
                        <div className="col-span-2">
                          <div className="mb-2 text-lg font-medium">{category.title}</div>
                          <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                          <div className="grid grid-cols-2 gap-2">
                            {category.subcategories.map((subcategory) => (
                              <a
                                key={subcategory.name}
                                href={subcategory.href}
                                className="text-sm hover:underline py-1"
                              >
                                {subcategory.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Acciones del lado derecho */}
          <div className="flex items-center space-x-2">
            {/* Barra de búsqueda */}
            <div
              className={cn(
                "transition-all duration-300 overflow-hidden",
                isSearchOpen ? "w-full md:w-64 opacity-100" : "w-0 opacity-0"
              )}
            >
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar productos..."
                  className="pl-9 h-9 w-full"
                />
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSearch}
              className="h-9 w-9"
            >
              {isSearchOpen ? <XIcon className="h-4 w-4" /> : <SearchIcon className="h-4 w-4" />}
            </Button>

            {/* Favoritos - Desktop */}
            <div className="hidden md:block">
              <DropdownMenu open={isFavoritesOpen} onOpenChange={setIsFavoritesOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 relative">
                    <HeartIcon className="h-4 w-4" />
                    {favoritesCount > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
                      >
                        {favoritesCount}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Mis Favoritos</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-[300px] overflow-y-auto">
                    {favorites.length > 0 ? (
                      favorites.map((product) => (
                        <div key={product.id}>
                          <FavoriteItem product={product} onRemove={removeFromFavorites} />
                          <DropdownMenuSeparator />
                        </div>
                      ))
                    ) : (
                      <div className="py-4 text-center text-muted-foreground">
                        No tienes productos favoritos
                      </div>
                    )}
                  </div>
                  {favorites.length > 0 && (
                    <div className="p-3">
                      <Button className="w-full" asChild>
                        <a href="#">Ver todos los favoritos</a>
                      </Button>
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Carrito - Desktop */}
            <div className="hidden md:block">
              <DropdownMenu open={isCartOpen} onOpenChange={setIsCartOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 relative">
                    <ShoppingCartIcon className="h-4 w-4" />
                    {cartCount > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
                      >
                        {cartCount}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Mi Carrito</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-[300px] overflow-y-auto">
                    {cart.length > 0 ? (
                      cart.map((product) => (
                        <div key={product.id}>
                          <CartItem product={product} onRemove={removeFromCart} />
                          <DropdownMenuSeparator />
                        </div>
                      ))
                    ) : (
                      <div className="py-4 text-center text-muted-foreground">
                        Tu carrito está vacío
                      </div>
                    )}
                  </div>
                  {cart.length > 0 && (
                    <>
                      <div className="p-3 border-t">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">Total:</span>
                          <span className="font-bold">${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button asChild>
                            <a href="#">Finalizar Compra</a>
                          </Button>
                          <Button variant="outline" asChild>
                            <a href="/shop">Ver Carrito</a>
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Carrito - Mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 relative md:hidden"
              onClick={() => setIsCartSheetOpen(true)}
            >
              <ShoppingCartIcon className="h-4 w-4" />
              {cartCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
                >
                  {cartCount}
                </Badge>
              )}
            </Button>

            {/* Favoritos - Mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 relative md:hidden"
              onClick={() => setIsFavoritesSheetOpen(true)}
            >
              <HeartIcon className="h-4 w-4" />
              {favoritesCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
                >
                  {favoritesCount}
                </Badge>
              )}
            </Button>

            {/* Menú de usuario */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                  {isAuthenticated ? (
                    <Avatar className="h-7 w-7">
                      <AvatarFallback>{getInitials(user)}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <UserIcon className="h-4 w-4" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {isAuthenticated ? (
                  <>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user?.first_name} {user?.last_name} {/* Corregido */}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>Perfil</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ShoppingBagIcon className="mr-2 h-4 w-4" />
                      <span>Pedidos</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <HeartIcon className="mr-2 h-4 w-4" />
                      <span>Favoritos</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <SettingsIcon className="mr-2 h-4 w-4" />
                      <span>Configuración</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogInIcon className="mr-2 h-4 w-4" />
                      <span>Cerrar Sesión</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <a href="/login" className="w-full">
                        <LogInIcon className="mr-2 h-4 w-4" />
                        <span>Iniciar Sesión</span>
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href="/register" className="w-full">
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>Registrarse</span>
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <HelpCircleIcon className="mr-2 h-4 w-4" />
                      <span>Ayuda</span>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Cart Sheet for Mobile */}
      <Sheet open={isCartSheetOpen} onOpenChange={setIsCartSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Mi Carrito ({cartCount})</SheetTitle>
          </SheetHeader>
          <div className="mt-6 flex flex-col h-[calc(100vh-10rem)]">
            <div className="flex-1 overflow-y-auto -mx-6 px-6">
              {cart.length > 0 ? (
                cart.map((product) => (
                  <div key={product.id} className="mb-4">
                    <CartItem product={product} onRemove={removeFromCart} />
                    <Separator className="mt-4" />
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBagIcon className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Tu carrito está vacío</h3>
                  <p className="text-muted-foreground mt-1">Agrega algunos productos para comenzar</p>
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t pt-4 mt-auto">
                <div className="flex justify-between mb-4">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-6">
                  <span className="font-medium">Total</span>
                  <span className="font-bold text-lg">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="space-y-3">
                  <Button className="w-full">Finalizar Compra</Button>
                  <Button variant="outline" className="w-full">
                    <a href="/shop">Ver Carrito</a>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Favorites Sheet for Mobile */}
      <Sheet open={isFavoritesSheetOpen} onOpenChange={setIsFavoritesSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Mis Favoritos ({favoritesCount})</SheetTitle>
          </SheetHeader>
          <div className="mt-6 flex flex-col h-[calc(100vh-10rem)]">
            <div className="flex-1 overflow-y-auto -mx-6 px-6">
              {favorites.length > 0 ? (
                favorites.map((product) => (
                  <div key={product.id} className="mb-4">
                    <FavoriteItem product={product} onRemove={removeFromFavorites} />
                    <Separator className="mt-4" />
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <HeartIcon className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No tienes favoritos</h3>
                  <p className="text-muted-foreground mt-1">Guarda productos para verlos más tarde</p>
                </div>
              )}
            </div>

            {favorites.length > 0 && (
              <div className="border-t pt-4 mt-auto">
                <div className="space-y-3">
                  <Button className="w-full">Ver Todos los Favoritos</Button>
                  <Button variant="outline" className="w-full">Agregar Todo al Carrito</Button>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}