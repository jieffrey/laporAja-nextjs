const OLLAMA_URL = process.env.OLLAMA_URL ?? "http://localhost:11434"
const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? "llama3.2"

export type AISuggestion = {
    category: string
    priority: "Low" | "Medium" | "High"
    confidence: number
}

const VALID_CATEGORIES = [
    "Infrastruktur",
    "Lingkungan",
    "Kebersihan",
    "Keamanan",
    "Fasilitas Umum",
    "Lainnya",
]

const SYSTEM_PROMPT = `Kamu adalah AI classifier untuk platform pengaduan masyarakat Indonesia bernama LaporAja.

Tugasmu: dari judul dan deskripsi laporan, tentukan KATEGORI dan PRIORITAS.

KATEGORI yang tersedia (pilih SATU):
- Infrastruktur (jalan rusak, jembatan, gorong-gorong, trotoar, penerangan jalan)
- Lingkungan (banjir, pohon tumbang, polusi, sungai tercemar, erosi)
- Kebersihan (sampah menumpuk, got mampet, drainase, limbah)
- Keamanan (vandalisme, pencurian, kriminal, rawan kejahatan)
- Fasilitas Umum (taman rusak, bangku rusak, toilet umum, halte, lampu taman)
- Lainnya (tidak masuk kategori di atas)

PRIORITAS:
- High: berbahaya, mengancam keselamatan, butuh penanganan segera (jalan ambles, banjir besar, pohon hampir roboh)
- Medium: mengganggu tapi tidak berbahaya langsung (sampah menumpuk, jalan berlubang kecil, lampu mati)
- Low: kosmetik, tidak urgent (cat pudar, rumput tinggi, coretan ringan)

RESPONS dalam format JSON SAJA, tanpa markdown, tanpa penjelasan:
{"category":"...","priority":"...","confidence":0.0}`

export async function categorizeReport(
    title: string,
    description: string
): Promise<AISuggestion> {
    const userPrompt = `Judul: ${title}\nDeskripsi: ${description}`

    try {
        const res = await fetch(`${OLLAMA_URL}/api/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: OLLAMA_MODEL,
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: userPrompt },
                ],
                stream: false,
                options: {
                    temperature: 0.1,
                    num_predict: 100,
                },
            }),
        })

        if (!res.ok) {
            throw new Error(`Ollama error: ${res.status}`)
        }

        const data = await res.json()
        const content = data.message?.content ?? ""

        // Parse JSON from response — handle potential markdown wrapping
        const jsonMatch = content.match(/\{[\s\S]*?\}/)
        if (!jsonMatch) {
            throw new Error("No JSON in response")
        }

        const parsed = JSON.parse(jsonMatch[0])

        // Validate category
        const category = VALID_CATEGORIES.includes(parsed.category)
            ? parsed.category
            : "Lainnya"

        // Validate priority
        const priority = ["Low", "Medium", "High"].includes(parsed.priority)
            ? (parsed.priority as "Low" | "Medium" | "High")
            : "Medium"

        // Validate confidence
        const confidence =
            typeof parsed.confidence === "number"
                ? Math.min(Math.max(parsed.confidence, 0), 1)
                : 0.5

        return { category, priority, confidence }
    } catch (error) {
        console.error("AI categorization failed:", error)
        return { category: "Lainnya", priority: "Medium", confidence: 0 }
    }
}