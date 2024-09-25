'use client'
import { useState, useEffect, useRef } from 'react'
import { Linkedin, FileText, Twitter, Bot , Download, Github,CalendarClock  } from 'lucide-react'
import Link from 'next/link'

const UKFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="24" height="12">
    <clipPath id="s">
      <path d="M0,0 v30 h60 v-30 z"/>
    </clipPath>
    <clipPath id="t">
      <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
    </clipPath>
    <g clipPath="url(#s)">
      <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
    </g>
  </svg>
)

const SpainFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 500" width="24" height="16">
    <rect width="750" height="500" fill="#c60b1e"/>
    <rect width="750" height="250" fill="#ffc400" y="125"/>
  </svg>
)

export default function Component() {
  const [output, setOutput] = useState<string[]>([])
  const [input, setInput] = useState('')
  const [language, setLanguage] = useState<'en' | 'es'>('en')
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const commands = {
    about: {
      en: {
        command: "about",
        output: "I'm an AI Software Engineer with 5 years of experience in developing cutting-edge AI solutions."
      },
      es: {
        command: "sobre",
        output: "Soy un Ingeniero de Software de IA con 5 años de experiencia en el desarrollo de soluciones de IA de vanguardia."
      }
    },
    stack: {
      en: {
        command: "stack",
        output: "Python, TensorFlow, PyTorch, Scikit-learn, Natural Language Processing, Computer Vision, Reinforcement Learning, Docker, Git"
      },
      es: {
        command: "stack",
        output: "Python, TensorFlow, PyTorch, Scikit-learn, Procesamiento del Lenguaje Natural, Visión por Computadora, Aprendizaje por Refuerzo, Docker, Git"
      }
    },
    projects: {
      en: {
        command: "projects",
        output: `
1. Sentiment Analysis API: Built a scalable API for real-time sentiment analysis of social media posts.
2. Object Detection System: Developed a computer vision system for autonomous vehicles using YOLO architecture.
3. Chatbot Framework: Created a flexible framework for building domain-specific chatbots using transformer models.
        `
      },
      es: {
        command: "proyectos",
        output: `
1. API de Análisis de Sentimientos: Construí una API escalable para el análisis de sentimientos en tiempo real de publicaciones en redes sociales.
2. Sistema de Detección de Objetos: Desarrollé un sistema de visión por computadora para vehículos autónomos utilizando la arquitectura YOLO.
3. Marco de Chatbot: Creé un marco flexible para construir chatbots de dominio específico utilizando modelos de transformadores.
        `
      }
    },
    education: {
      en: {
        command: "education",
        output: "Ph.D. in Computer Science, specialization in Machine Learning - Stanford University (2018-2022)"
      },
      es: {
        command: "formacion",
        output: "Doctorado en Ciencias de la Computación, especialización en Aprendizaje Automático - Universidad de Stanford (2018-2022)"
      }
    },
    contact: {
      en: {
        command: "contact",
        output: "Email: ai.engineer@example.com | LinkedIn: linkedin.com/in/ai-engineer | GitHub: github.com/ai-engineer"
      },
      es: {
        command: "contacto",
        output: "Correo: ai.engineer@example.com | LinkedIn: linkedin.com/in/ai-engineer | GitHub: github.com/ai-engineer"
      }
    },
    clear: {
      en: {
        command: "clear",
        output: "clear"
      },
      es: {
        command: "clear",
        output: "clear"
      }
    },
    savecv: {
      en: {
        command: "save cv",
        output: "Saving CV as PDF...\nCV saved successfully! You can find it in your downloads folder."
      },
      es: {
        command: "CV",
        output: "Guardando CV como PDF...\n¡CV guardado con éxito! Puedes encontrarlo en tu carpeta de descargas."
      }
    }
  }

  const commandRegexes = {
    about: /^(about|sobre)$/i,
    stack: /^(stack|stack)$/i,
    projects: /^(projects|proyectos)$/i,
    education: /^(education|formacion)$/i,
    contact: /^(contact|contacto)$/i,
    clear: /^(clear|clear)$/i,
    savecv: /^(save cv|CV)$/i
  }

  const welcomeMessage = {
    en: [
      "Welcome to AI Engineer's Portfolio.",
      "Available commands: " + Object.keys(commands).map(cmd => commands[cmd as keyof typeof commands].en.command).join(', '),
      "Type a command to explore the portfolio.",
    ],
    es: [
      "Bienvenido al Portafolio del Ingeniero de IA.",
      "Comandos disponibles: " + Object.keys(commands).map(cmd => commands[cmd as keyof typeof commands].es.command).join(', '),
      "Escribe un comando para explorar el portafolio.",
    ]
  }
  const TitleTerminal = {
    en: ["Here begins 'The Forest'"],
    es: ["Aquí empieza 'El Bosque'"]
  }

  useEffect(() => {
    setOutput([])
  }, [language])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [output])

  const findCommand = (input: string): string | null => {
    for (const [command, regex] of Object.entries(commandRegexes)) {
      if (regex.test(input)) {
        return command
      }
    }
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedInput = input.trim().toLowerCase()
    let newOutput: string[]

    const matchedCommand = findCommand(trimmedInput)

    if (matchedCommand === 'clear') {
      newOutput = []
    } else if (matchedCommand) {
      const commandOutput = commands[matchedCommand as keyof typeof commands][language]
      newOutput = [...output, `$ ${commandOutput.command}`, commandOutput.output]
    } else {
      newOutput = [...output, `$ ${input}`, language === 'en' ? `Command not found: ${input}. Type a valid command to explore the portfolio.` : `Comando no encontrado: ${input}. Escribe un comando válido para explorar el portafolio.`]
    }

    setOutput(newOutput)
    setInput('')
    inputRef.current?.focus()
  }

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'es' : 'en')
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-4 sm:p-6 md:p-8"
      style={{
        backgroundImage: "url('https://raw.githubusercontent.com/maricruz99/maricruz99/refs/heads/main/embalse.png')"
      }}
    >
      <div className="w-full max-w-2xl bg-black bg-opacity-30 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white border-opacity-20 mb-4">
        <div className="bg-black bg-opacity-40 p-2 flex items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex-grow text-center">
            <span className="text-sm text-white font-medium">The Carmen's Forest</span>
          </div>
        </div>
        <div className="bg-black bg-opacity-30 text-white p-2 sm:p-3 md:p-4 font-mono text-xs sm:text-sm">
          {welcomeMessage[language].map((line, index) => (
            <div key={index} className="mb-1 sm:mb-2 font-bold text-shadow">
              {line}
            </div>
          ))}
        </div>
        <div 
          ref={terminalRef}
          className="bg-black bg-opacity-30 text-white p-2 sm:p-3 md:p-4 font-mono text-xs sm:text-sm h-48 sm:h-64 md:h-80 overflow-y-auto"
        >
          {output.map((line, index) => (
            <div key={index} className="mb-1 sm:mb-2 font-bold text-shadow">
              {line}
            </div>
          ))}
          <form onSubmit={handleSubmit} className="flex items-center mt-2">
            <span className="mr-2 font-bold text-shadow">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow bg-transparent outline-none font-bold text-shadow"
              autoFocus
              ref={inputRef}
              aria-label={language === 'en' ? "Enter command" : "Ingrese el comando"}
            />
          </form>
        </div>
      </div>
      <div className="w-full max-w-2xl bg-black bg-opacity-30 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white border-opacity-20 p-2 sm:p-3 md:p-4">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          <Link href="https://www.linkedin.com/in/carmen-cruzado/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors">
            <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link href="https://medium.com/@carcruz97" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-400 transition-colors">
            <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="sr-only">Medium</span>
          </Link>
          <Link href="https://x.com/carcruz97" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300 transition-colors">
            <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="https://replicate.com/carcruz97" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-400 transition-colors">
            <Bot  className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="sr-only">Replicate</span>
          </Link>
          <Link href="https://calendly.com/carmencruzado97/data-ai" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-400 transition-colors">
            <CalendarClock className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="sr-only">Calendar</span>
          </Link>
          <Link href="https://github.com/carcruz97/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition-colors">
            <Github className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="sr-only">GitHub</span>
          </Link>
          <button 
            onClick={() => alert(language === 'en' ? 'CV downloaded!' : '¡CV descargado!')} 
            className="text-white hover:text-yellow-400 transition-colors"
            aria-label={language === 'en' ? "Download CV" : "Descargar CV"}
          >
            <Download className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button 
            onClick={toggleLanguage} 
            className="text-white hover:text-green-400 transition-colors"
            aria-label={language === 'en' ? "Switch to Spanish" : "Cambiar a Inglés"}
          >
            {language === 'en' ? <SpainFlag /> : <UKFlag />}
          </button>
        </div>
      </div>
    </div>
  )
}
