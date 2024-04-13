import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertDestructive(message) {
  return (
    <Alert variant="destructive" className="max-w-lg">
      <AlertCircle className="h-4 w-4 text-red-500" />
      <AlertTitle className="text-red-500">Error</AlertTitle>
      <AlertDescription className="text-red-500">
        {message}
      </AlertDescription>
    </Alert>
  )
}
