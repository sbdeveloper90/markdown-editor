"use client"

import { useState, useRef } from "react"
import dynamic from "next/dynamic"
import Toolbar from "@/components/Toolbar"
import jsPDF from "jspdf"
import html2canvas from "html2canvas-pro"

const MarkdownEditor = dynamic(() => import("@/components/MarkdownEditor"), {
  ssr: false,
})

const defaultContent = `# Benvenuto nell'Editor Markdown

## Caratteristiche

Questo è un **editor Markdown** completo con le seguenti funzionalità:

- Anteprima in tempo reale
- Syntax highlighting
- Salvataggio nel database
- Esportazione in PDF e MD

### Esempio di codice

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
\`\`\`

### Lista numerata

1. Primo elemento
2. Secondo elemento
3. Terzo elemento

### Citazione

> "La semplicità è la massima sofisticazione." - Leonardo da Vinci

### Tabella

| Nome | Cognome | Età |
|------|---------|-----|
| Mario | Rossi | 30 |
| Laura | Bianchi | 25 |

### Link

Visita [GitHub](https://github.com) per scoprire progetti open source.

---

Inizia a scrivere il tuo contenuto Markdown nella colonna di sinistra!
`

export default function Home() {
  const [content, setContent] = useState(defaultContent)
  const previewRef = useRef<HTMLDivElement>(null)

  const handleExportPDF = async () => {
    if (!previewRef.current) return

    try {
      // Crea un canvas dall'elemento preview
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })

      const imgWidth = 210 // A4 width in mm
      const pageHeight = 297 // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      } 

      pdf.save('markdown-editor.pdf')
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Errore durante la generazione del PDF')
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <Toolbar
        content={content}
        onContentChange={setContent}
        onExportPDF={handleExportPDF}
      />
      <MarkdownEditor
        content={content}
        onContentChange={setContent}
        previewRef={previewRef}
      />
    </div>
  )
}