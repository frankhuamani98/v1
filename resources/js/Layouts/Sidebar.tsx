import React, { useState } from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import { ChevronDown, ChevronRight, Home, LogOut, Car, Users, BarChart as ChartBar, Cog, Menu, FileText, CreditCard, Bell, HelpCircle, UserPlus, Truck, Calendar, BarChart2, PieChart, TrendingUp } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  href?: string;
  subItems?: Array<{ label: string; href: string }>;
  isActive?: boolean;
};

const NavItem = ({ icon, label, href, subItems, isActive }: NavItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasSubItems = subItems && subItems.length > 0;

  return (
    <div className="w-full">
      <div
        className={cn(
          "flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors",
          isActive ? "bg-primary/10 text-primary" : "hover:bg-primary/5 hover:text-primary"
        )}
        onClick={() => hasSubItems && setIsOpen(!isOpen)}
      >
        {href ? (
          <InertiaLink
            href={href}
            className="flex items-center space-x-3 w-full"
          >
            <div className="flex-shrink-0">{icon}</div>
            <span className="font-medium">{label}</span>
          </InertiaLink>
        ) : (
          <div className="flex items-center space-x-3 w-full cursor-pointer" onClick={() => hasSubItems && setIsOpen(!isOpen)}>
            <div className="flex-shrink-0">{icon}</div>
            <span className="font-medium">{label}</span>
          </div>
        )}
        {hasSubItems && (
          <div className="flex-shrink-0">
            {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </div>
        )}
      </div>

      {hasSubItems && isOpen && (
        <div className="ml-6 mt-1 space-y-1 border-l-2 border-primary/20 pl-3">
          {subItems.map((item, index) => (
            <InertiaLink
              key={index}
              href={item.href}
              className="block py-1.5 px-2 text-sm rounded-md hover:bg-primary/5 hover:text-primary transition-colors"
            >
              {item.label}
            </InertiaLink>
          ))}
        </div>
      )}
    </div>
  );
};

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const navItems = [
    {
      icon: <Home size={20} />,
      label: "Dashboard",
      href: "/dashboard", // Ruta correcta
      isActive: true,
  },
    {
      icon: <Calendar size={20} />,
      label: "Gestión de Reservas",
      subItems: [
        { label: "Reservas Nuevas", href: "/reservas/nuevas" }, // Ruta correcta
        { label: "Estado de Reservas", href: "/reservas/estado" },
        { label: "Reservas Finalizadas", href: "/reservas/finalizadas" },
        { label: "Historial de Reservas", href: "/reservas/historial" },
      ],
    },
    {
      icon: <Users size={20} />,
      label: "Gestión de Clientes",
      subItems: [
        { label: "Lista de Usuarios", href: "/usuarios" },
        { label: "Administradores", href: "/usuarios/administradores" },
        { label: "Todos los Usuarios", href: "/usuarios/todos" },
      ],
    },
    {
      icon: <BarChart2 size={20} />,
      label: "Gestión de Productos Utilizados",
      subItems: [
        { label: "Agregar Producto", href: "/productos/agregar" },
        { label: "Inventario de Productos", href: "/productos/inventario" },
        { label: "Historial de Uso", href: "/productos/historial" },
      ],
    },
    {
      icon: <UserPlus size={20} />,
      label: "Gestión de Mecánicos",
      subItems: [
        { label: "Registrar Mecánico", href: "/mecanicos/registrar" },
        { label: "Lista de Mecánicos", href: "/mecanicos" },
        { label: "Horarios de Trabajo", href: "/mecanicos/horarios" },
      ],
    },
    {
      icon: <Truck size={20} />,
      label: "Gestión de Motos",
      subItems: [
        { label: "Registro de Motos", href: "/motos/registro" },
        { label: "Historial de Servicios", href: "/motos/historial-servicios" },
        { label: "Estado de Motos", href: "/motos/estado" },
      ],
    },
    {
      icon: <HelpCircle size={20} />,
      label: "Gestión de Reclamos",
      subItems: [
        { label: "Nuevos Reclamos", href: "/reclamos/nuevos" },
        { label: "Estado de Reclamos", href: "/reclamos/estado" },
        { label: "Reclamos Resueltos", href: "/reclamos/resueltos" },
      ],
    },
    {
      icon: <CreditCard size={20} />,
      label: "Gestión de Proveedores",
      subItems: [
        { label: "Lista de Proveedores", href: "/proveedores" },
        { label: "Órdenes de Compra", href: "/proveedores/ordenes" },
      ],
    },
    {
      icon: <FileText size={20} />,
      label: "Gestión de Facturación",
      subItems: [
        { label: "Facturas Pendientes", href: "/facturacion/pendientes" },
        { label: "Historial de Facturas", href: "/facturacion/historial" },
      ],
    },
    {
      icon: <Calendar size={20} />,
      label: "Gestión de Citas",
      subItems: [
        { label: "Agendar Citas", href: "/citas/agendar" },
        { label: "Calendario de Citas", href: "/citas/calendario" },
      ],
    },
    {
      icon: <ChartBar size={20} />,
      label: "Reportes y Análisis",
      subItems: [
        { label: "Reportes Financieros", href: "/reportes/financieros" },
        { label: "Análisis de Rendimiento", href: "/reportes/rendimiento" },
      ],
    },
    {
      icon: <Cog size={20} />,
      label: "Gestión de Inventario",
      subItems: [
        { label: "Stock de Repuestos", href: "/inventario/stock" },
        { label: "Alertas de Stock Bajo", href: "/inventario/alertas" },
      ],
    },
    {
      icon: <Menu size={20} />,
      label: "Configuración de Precios",
      subItems: [
        { label: "Lista de Precios", href: "/precios/lista" },
        { label: "Descuentos y Promociones", href: "/precios/descuentos" },
      ],
    },
    {
      icon: <HelpCircle size={20} />,
      label: "Soporte y Ayuda",
      subItems: [
        { label: "Manual del Usuario", href: "/soporte/manual" },
        { label: "Soporte Técnico", href: "/soporte/tecnico" },
      ],
    },
    {
      icon: <TrendingUp size={20} />,
      label: "Marketing y Promociones",
      subItems: [
        { label: "Campañas de Marketing", href: "/marketing/campanas" },
        { label: "Feedback de Clientes", href: "/marketing/feedback" },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 lg:w-72 bg-card border-r shadow-lg flex flex-col transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0" // Always visible on medium screens and up
        )}
      >
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <Car size={28} className="text-primary" />
            <h1 className="text-xl font-bold">Rudolf Motors</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Premium Auto Management</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1.5">
          {navItems.map((item, index) => (
            <NavItem
              key={index}
              icon={item.icon}
              label={item.label}
              href={item.href}
              subItems={item.subItems}
              isActive={item.isActive}
            />
          ))}
        </nav>

      </aside>
    </>
  );
};

export default Sidebar;
