"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Play,
  CheckCircle,
  Menu,
  LogOut,
  Settings,
  BookOpen,
  Lock,
  ShoppingCart,
  Droplet,
  Package,
  Users,
} from "lucide-react"

interface UserData {
  id: number
  name: string
  email: string
  produto1: boolean
  produto2: boolean
  produto3: boolean
}

interface ComponentProps {
  userEmail: string
  userData: UserData | null
}

export default function Component({ userEmail, userData: initialUserData }: ComponentProps) {
  const [userData, setUserData] = useState<UserData | null>(initialUserData)
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const fetchUserData = async (email: string) => {
    try {
      const response = await fetch(`https://area-de-membros-backend.g8hlwx.easypanel.host/buscardados/${encodeURIComponent(email)}`)
      const fetchedData: UserData = await response.json()
      setUserData(fetchedData)
      localStorage.setItem("userData", JSON.stringify(fetchedData))
      localStorage.setItem("userDataTimestamp", new Date().getTime().toString())
    } catch (err) {
      console.error("Erro ao buscar dados do usuário:", err)
    }
  }

  useEffect(() => {
  const storedEmail = localStorage.getItem("verifiedEmail")
  if (storedEmail) {
    fetchUserData(storedEmail)
  }
}, [])

  const modules = [
    {
      id: 1,
      title: "Escola de Resina",
      description: "Aprenda todas as técnicas de trabalho com resina do básico ao avançado",
      category: "escola",
      thumbnail: "/images/escola-resina.png",
      status: userData?.produto1 ? "disponivel" : "bloqueado",
      driveLink: "https://drive.google.com/drive/folders/16XuEWGhPfkgG8XP4G8sgafXBRFsc0QJA?usp=sharing",
    },
    {
      id: 2,
      title: "Modelos Exclusivos de RESINA",
      description: "Acesse nossa biblioteca com centenas de modelos exclusivos para seus projetos",
      category: "modelos",
      thumbnail: userData?.produto2 ? "/images/modelos-exclusivos.png" : "/images/modelos-exclusivos-locked.png",
      status: userData?.produto2 ? "disponivel" : "bloqueado",
      driveLink: "https://drive.google.com/open?id=1UtMz-mABw_dkIGnyhzLgLIK3Qwv5AUpB&usp=drive_fs",
      paymentLink: "https://resinalucrativa.mycartpanda.com/checkout/198606582:1?utm_source=membros",
    },
    {
      id: 3,
      title: "Fornecedores de Resina",
      description: "Lista completa de fornecedores confiáveis com os melhores preços do mercado",
      category: "fornecedores",
      thumbnail: userData?.produto3 ? "/images/fornecedores-resina.png" : "/images/fornecedores-resina-locked.png",
      status: userData?.produto3 ? "disponivel" : "bloqueado",
      driveLink: "https://drive.google.com/open?id=1Q1nGNLreLHgKFCqSBJlIGkta7NWPw_JS&usp=drive_fs",
      paymentLink: "https://resinalucrativa.mycartpanda.com/checkout/198606789:1?utm_source=membros",
    },
  ]

  const categories = [
    { id: "todos", name: "Todos os Módulos", icon: BookOpen, count: modules.length },
    { id: "escola", name: "Escola de Resina", icon: Droplet, count: modules.filter((m) => m.category === "escola").length },
    { id: "modelos", name: "Modelos Exclusivos", icon: Package, count: modules.filter((m) => m.category === "modelos").length },
    { id: "fornecedores", name: "Fornecedores", icon: Users, count: modules.filter((m) => m.category === "fornecedores").length },
  ]

  const filteredModules = selectedCategory === "todos" ? modules : modules.filter((m) => m.category === selectedCategory)

  const handleLogout = () => {
    localStorage.removeItem("verifiedEmail")
    localStorage.removeItem("userData")
    localStorage.removeItem("userDataTimestamp")
    window.location.reload()
  }

  const handleAccessClick = (driveLink: string) => window.open(driveLink, "_blank")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="flex h-16 items-center px-4 lg:px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="h-6 w-6" />
          </Button>

          <div className="flex items-center gap-2 font-semibold">
            <Droplet className="h-6 w-6 text-purple-600" />
            <span className="hidden sm:inline">Escola de Resina</span>
          </div>

          <div className="ml-auto flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="Avatar" />
                    <AvatarFallback>{userEmail[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userData?.name || "Membro"}</p>
                    <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 w-64 bg-white border-r transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
        >
          <div className="flex h-full flex-col">
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-4">Categorias</h2>
            </div>
            <nav className="flex-1 space-y-1 px-3 overflow-y-auto">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "secondary" : "ghost"}
                    className="w-full justify-start text-sm"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    <span className="truncate">{category.name}</span>
                    <Badge variant="secondary" className="ml-auto text-xs">{category.count}</Badge>
                  </Button>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Overlay mobile */}
        {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">{selectedCategory === "todos" ? "Todos os Módulos" : categories.find((c) => c.id === selectedCategory)?.name}</h1>
            <p className="text-muted-foreground">
              {filteredModules.length} módulo{filteredModules.length !== 1 ? "s" : ""} disponível{filteredModules.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredModules.map((module) => (
              <Card key={module.id} className={`overflow-hidden hover:shadow-lg transition-shadow ${module.status === "bloqueado" ? "opacity-60" : ""}`}>
                <div className="aspect-video relative">
                  <img src={module.thumbnail || "/placeholder.svg"} alt={module.title} className={`object-cover w-full h-full ${module.status === "bloqueado" ? "grayscale" : ""}`} />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    {module.status === "bloqueado" ? <Lock className="h-8 w-8 text-white" /> : <Play className="h-8 w-8 text-white" />}
                  </div>
                  <Badge className="absolute top-2 right-2" variant={module.status === "disponivel" ? "default" : "secondary"} style={module.status === "disponivel" ? { backgroundColor: "#9333ea", color: "white" } : {}}>
                    {module.status === "disponivel" ? <><CheckCircle className="w-3 h-3 mr-1" />Disponível</> : <><Lock className="w-3 h-3 mr-1" />Bloqueado</>}
                  </Badge>
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className={`line-clamp-1 text-base ${module.status === "bloqueado" ? "text-gray-500" : ""}`}>{module.title}</CardTitle>
                  <CardDescription className={`line-clamp-2 text-sm ${module.status === "bloqueado" ? "text-gray-400" : ""}`}>{module.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    {module.status === "bloqueado" ? (
                      <Button className="w-full bg-purple-600 hover:bg-purple-700" size="sm" onClick={() => window.open(module.paymentLink, "_blank")}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Comprar Acesso
                      </Button>
                    ) : (
                      <Button className="w-full bg-purple-600 hover:bg-purple-700" size="sm" onClick={() => handleAccessClick(module.driveLink)}>
                        Acessar
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
