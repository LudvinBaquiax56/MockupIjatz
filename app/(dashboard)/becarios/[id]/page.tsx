"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Shield } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useCurrentUser } from "@/lib/auth-context"
import { useMockData } from "@/lib/mock-data-context"
import { BecarioDetail } from "@/components/becarios/becario-detail"
import { EditBecarioDialog } from "@/components/becarios/edit-becario-dialog"

export default function BecarioPage() {
  const params = useParams()
  const router = useRouter()
  const { currentUser, isBecario } = useCurrentUser()
  const { becarios } = useMockData()
  const [editOpen, setEditOpen] = useState(false)

  const id = typeof params.id === "string" ? params.id : params.id?.[0]
  const becario = becarios.find((b) => b.id === id)

  if (!becario) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24 text-muted-foreground">
        <Shield className="size-10 opacity-40" />
        <p className="text-sm">Becario no encontrado</p>
      </div>
    )
  }

  if (isBecario && currentUser?.becarioId !== id) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24 text-muted-foreground">
        <Shield className="size-10 opacity-40" />
        <p className="text-sm font-medium">Sin acceso</p>
        <p className="text-xs">Solo puedes ver tu propio perfil</p>
      </div>
    )
  }

  const isOwner = isBecario && currentUser?.becarioId === id

  return (
    <div className="flex flex-col gap-4 p-6">
      {!isBecario && (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/becarios">Becarios</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {becario.nombre} {becario.apellido}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )}
      <BecarioDetail
        becario={becario}
        onBack={() => router.push(isBecario ? "/" : "/becarios")}
        onEdit={isOwner ? () => setEditOpen(true) : undefined}
      />
      {isOwner && (
        <EditBecarioDialog
          becario={becario}
          open={editOpen}
          onOpenChange={setEditOpen}
        />
      )}
    </div>
  )
}
