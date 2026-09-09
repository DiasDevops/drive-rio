import { Attraction, Driver, DiscountCoupon, ChatThread, Message } from '../types';

export const HERO_DETAILS = {
  title: "A Experiência Definitiva na Cidade Maravilhosa",
  subtitle: "Sua viagem dos sonhos com transporte privativo credenciado, descontos exclusivos nos principais cartões-postais e comunicação direta 100% segura.",
  badgeText: "Plataforma Oficial de Turismo & Receptivo no Rio de Janeiro",
  heroImage: "/src/assets/images/rio_hero_cover_1786373474729.jpg",
  stats: [
    { label: "Atendimentos com Sucesso", value: "15.000+" },
    { label: "Motoristas Credenciados Cadastur", value: "120+" },
    { label: "Pontos Turísticos com Desconto", value: "35+" },
    { label: "Avaliação Média dos Passageiros", value: "4.9 ★" },
  ]
};

export const ATTRACTIONS_DATA: Attraction[] = [
  {
    id: "cristo-redentor",
    name: "Cristo Redentor & Corcovado",
    subtitle: "Uma das 7 Maravilhas do Mundo Moderno",
    category: "monument",
    imageUrl: "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?auto=format&fit=crop&q=80&w=1000",
    description: "Símbolo máximo do Rio de Janeiro localizado no topo do Morro do Corcovado a 710 metros acima do nível do mar, cercado pela exuberante Floresta da Tijuca.",
    accessInfo: "Acesso via Trem do Corcovado (Cosme Velho) ou Vans Oficiais Paineiras (Largo do Machado/Copacabana). Recomendamos contratação de traslado com motorista para evitar filas no estacionamento.",
    operatingHours: "Diariamente, das 08h às 19h",
    ticketPrice: "R$ 117,50 (Baixa temp) / R$ 142,00 (Alta temp)",
    discountAvailable: true,
    discountPercentage: 20,
    highlightTag: "Atração Principal",
    fastPassAvailable: true,
    coordinates: { lat: -22.9519, lng: -43.2105 },
    tips: [
      "Compre o ingresso com horário marcado com pelo menos 48h de antecedência.",
      "Vá nas primeiras horas da manhã (08:00) para fotos com menos aglomeração.",
      "Motoristas da plataforma possuem permissão para desembarque rápido no Cosme Velho."
    ]
  },
  {
    id: "pao-de-acucar",
    name: "Bondinho Pão de Açúcar",
    subtitle: "Vista Panorâmica Panorâmica de 360° da Baía de Guanabara",
    category: "monument",
    imageUrl: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=80&w=1000",
    description: "Passeio de teleférico ligando a Praia Vermelha ao Morro da Urca e depois ao famoso Pão de Açúcar. Uma vista inesquecível da orla carioca.",
    accessInfo: "Localizado na Praia Vermelha, Urca. Fácil estacionamento e ponto de desembarque de executivos e táxis credenciados.",
    operatingHours: "Diariamente, das 08h30 às 20h (último embarque 18h30)",
    ticketPrice: "R$ 180,00 (Bilhete Regular Bilheteiro)",
    discountAvailable: true,
    discountPercentage: 15,
    highlightTag: "Imperdível no Pôr do Sol",
    fastPassAvailable: true,
    coordinates: { lat: -22.9492, lng: -43.1545 },
    tips: [
      "O pôr do sol das 17h30 no Morro da Urca é considerado um dos mais belos do planeta.",
      "Aproveite para caminhar na Pista Cláudio Coutinho no sopé da montanha.",
      "Utilize o Cupom RIOEXPRESS15 para 15% de desconto no transporte + bilhete."
    ]
  },
  {
    id: "escadaria-selaron",
    name: "Escadaria Selarón & Lapa",
    subtitle: "Mosaico de Azulejos de mais de 60 Países",
    category: "culture",
    imageUrl: "https://images.unsplash.com/photo-1548801133-da307208d172?auto=format&fit=crop&q=80&w=1000",
    description: "Obra de arte a céu aberto criada pelo artista chileno Jorge Selarón, conectando os bairros boêmios da Lapa e Santa Teresa.",
    accessInfo: "Acesso pela Rua Joaquim Silva na Lapa. Próximo aos Arcos da Lapa.",
    operatingHours: "Acesso livre 24 horas (recomendado período diurno)",
    ticketPrice: "Gratuito",
    discountAvailable: true,
    discountPercentage: 10,
    highlightTag: "Fotogênico & Cultural",
    fastPassAvailable: false,
    coordinates: { lat: -22.9154, lng: -43.1797 },
    tips: [
      "Suba a escadaria até o topo para visitar os ateliês de Santa Teresa.",
      "Combine o passeio com um almoço tradicional de feijoada na Lapa.",
      "Nossos motoristas podem te aguardar na base da escadaria enquanto você faz fotos."
    ]
  },
  {
    id: "copacabana-ipanema",
    name: "Praia de Copacabana & Ipanema",
    subtitle: "O Calçadão Mais Famoso do Mundo e o Pôr do Sol no Arpoador",
    category: "beach",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000",
    description: "Quilômetros de areia dourada, quiosques gastronômicos sofisticados, esportes praianos e a atmosfera vibrante da Zona Sul do Rio.",
    accessInfo: "Extensa faixa litorânea servida por diversos pontos de embarque de veículos privativos.",
    operatingHours: "Acesso Livre",
    ticketPrice: "Gratuito",
    discountAvailable: true,
    discountPercentage: 25,
    highlightTag: "Lazer & Gastronomia",
    fastPassAvailable: false,
    coordinates: { lat: -22.9711, lng: -43.1825 },
    tips: [
      "Desfrute de cupons para quiosques credenciados com porção de peixe + caipirinha em dobro.",
      "Assista ao ritual de aplaudir o pôr do sol na Pedra do Arpoador às 18h.",
      "Solicite um motorista para ida e volta com ar-condicionado após o dia de praia."
    ]
  },
  {
    id: "parque-lage",
    name: "Parque Lage & Jardim Botânico",
    subtitle: "Patrimônio Histórico e Ambiental na Base do Corcovado",
    category: "nature",
    imageUrl: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=1000",
    description: "Casarão neoclássico cercado pela Mata Atlântica, palmeiras imperiais seculares e o famoso pátio central com piscina e vista direta para o Cristo Redentor.",
    accessInfo: "Rua Jardim Botânico, 414. Desembarque facilitado na portaria principal.",
    operatingHours: "Diariamente, das 08h às 17h",
    ticketPrice: "Gratuito (Parque Lage) / R$ 67,00 (Jardim Botânico)",
    discountAvailable: true,
    discountPercentage: 15,
    highlightTag: "Natureza & Fotografia",
    fastPassAvailable: false,
    coordinates: { lat: -22.9599, lng: -43.2120 },
    tips: [
      "Agende um café da manhã no Plage Café dentro do pátio histórico.",
      "Excelente passeio matinal para famílias e casais em busca de fotos com o Cristo ao fundo."
    ]
  },
  {
    id: "maracana-sambodromo",
    name: "Tour Maracanã & Sambódromo",
    subtitle: "Templo Sagrado do Futebol e Palco do Maior Show da Terra",
    category: "culture",
    imageUrl: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=1000",
    description: "Visita aos bastidores do lendário estádio do Maracanã, incluindo vestiários, sala de imprensa e gramado, e à Passarela do Samba na Marquês de Sapucaí.",
    accessInfo: "Av. Pres. Castelo Branco, Portão 2. Estacionamento dedicado para trasquetes privativos.",
    operatingHours: "Terça a Domingo, das 09h às 16h30",
    ticketPrice: "R$ 75,00 (Tour Guiado)",
    discountAvailable: true,
    discountPercentage: 15,
    highlightTag: "Paixão Carioca",
    fastPassAvailable: true,
    coordinates: { lat: -22.9121, lng: -43.2302 },
    tips: [
      "Em dias de jogo do Flamengo ou Fluminense, a visitação encerra mais cedo. Verifique o calendário.",
      "Nossos motoristas montam pacotes combinados com Sambódromo e Museu do Amanhã."
    ]
  }
];

export const DRIVERS_DATA: Driver[] = [
  {
    id: "drv-01",
    name: "Carlos Eduardo Silva",
    photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    rating: 4.98,
    reviewsCount: 342,
    vehicle: {
      model: "Toyota Corolla Cross XRE",
      type: "SUV Premium",
      capacity: 4,
      year: 2024,
      plateEnd: "9",
      airConditioned: true
    },
    languages: ["Português", "Inglês (Fluente)", "Espanhol"],
    badges: ["Motorista Diamante", "Guia Regional Cadastur", "Tour Bilingüe", "Assento Infantil Disponível"],
    hourlyRate: 120,
    cityTourRate: 450,
    corcovadoTransferRate: 180,
    bio: "Nascido e criado no Rio de Janeiro, atuo há mais de 8 anos no transporte executivo e receptivo turístico. Conheço as melhores rotas seguras, horários sem trânsito e segredos da gastronomia local.",
    available: true,
    cadasturVerified: true
  },
  {
    id: "drv-02",
    name: "Marcella Santos & Equipe VIP",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    rating: 4.96,
    reviewsCount: 289,
    vehicle: {
      model: "Mercedes-Benz Sprinter Executiva",
      type: "Van Executiva",
      capacity: 15,
      year: 2023,
      plateEnd: "3",
      airConditioned: true
    },
    languages: ["Português", "Inglês", "Francês"],
    badges: ["Grupos & Famílias", "Frota Executiva", "Cadastur Ativo", "Wi-Fi & Água Cortesia"],
    hourlyRate: 220,
    cityTourRate: 890,
    corcovadoTransferRate: 350,
    bio: "Especialista em transporte de grupos, famílias e comitivas. Ofereço serviço personalizado com van executiva de alto padrão, TV, bancos reclináveis de couro e atendimento multilíngue.",
    available: true,
    cadasturVerified: true
  },
  {
    id: "drv-03",
    name: "Rodrigo Costa",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    rating: 4.95,
    reviewsCount: 198,
    vehicle: {
      model: "Honda Civic Touring Turbo",
      type: "Sedan Executivo",
      capacity: 4,
      year: 2023,
      plateEnd: "7",
      airConditioned: true
    },
    languages: ["Português", "Espanhol (Avançado)"],
    badges: ["Pontualidade Garantida", "Transfer Aeroportos GIG/SDU", "Cadastur Verificado"],
    hourlyRate: 110,
    cityTourRate: 420,
    corcovadoTransferRate: 160,
    bio: "Motorista focado em transfers pontuais de/para os aeroportos Galeão (GIG) e Santos Dumont (SDU), além de tours customizados para casais e viajantes a negócios.",
    available: true,
    cadasturVerified: true
  },
  {
    id: "drv-04",
    name: "Fernando 'Nando' Oliveira",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    rating: 4.99,
    reviewsCount: 412,
    vehicle: {
      model: "Jeep Commander Limited 7 Lugares",
      type: "SUV Premium",
      capacity: 6,
      year: 2024,
      plateEnd: "5",
      airConditioned: true
    },
    languages: ["Português", "Inglês (Fluente)", "Alemão"],
    badges: ["Especialista em Praias da Zona Oeste", "Som Premium", "Foto & Vídeo de Cortesia"],
    hourlyRate: 150,
    cityTourRate: 580,
    corcovadoTransferRate: 220,
    bio: "Tour de dia inteiro com fotógrafo amador incluso! Te levo aos pontos turísticos tradicionais e também às joias escondidas como Prainha, Grumari e Mirante Dona Marta.",
    available: true,
    cadasturVerified: true
  }
];

export const DISCOUNTS_DATA: DiscountCoupon[] = [
  {
    id: "disc-01",
    title: "20% OFF Trem do Corcovado & Cristo Redentor",
    partnerName: "Trem do Corcovado Oficial",
    code: "CRISTOVIP20",
    discountPercentage: 20,
    validUntil: "31/12/2026",
    category: "Pontos Turísticos",
    description: "Desconto válido para compra de ingressos de ida e volta do trem histórico do Corcovado quando reservado junto com transporte credenciado da plataforma.",
    terms: "Válido para até 4 ingressos por reserva. Aplicável no checkout da plataforma.",
    popular: true
  },
  {
    id: "disc-02",
    title: "15% OFF no Passeio Bondinho Pão de Açúcar",
    partnerName: "Parque Bondinho Pão de Açúcar",
    code: "BONDINHO15",
    discountPercentage: 15,
    validUntil: "31/12/2026",
    category: "Pontos Turísticos",
    description: "Ingresso com acesso rápido (Fast Track) para evitar filas na bilheteria da Praia Vermelha e Morro da Urca.",
    terms: "Válido em qualquer dia da semana, incluindo feriados.",
    popular: true
  },
  {
    id: "disc-03",
    title: "Combo City Tour 8 Horas: R$ 100 de Desconto",
    partnerName: "Associação de Motoristas VIP Rio",
    code: "RIOMARAVILHA100",
    discountPercentage: 25,
    validUntil: "15/11/2026",
    category: "Transfer & Motoristas",
    description: "Contrate 8 horas de motorista privativo à disposição (Cristo + Pão de Açúcar + Lapa + Santa Teresa + Almoço) e ganhe R$ 100 de desconto direto no valor total.",
    terms: "Aplicável apenas para agendamentos efetuados pelo chat da plataforma com motoristas credenciados.",
    popular: true
  },
  {
    id: "disc-04",
    title: "Voo Panorâmico de Helicóptero: 10% OFF",
    partnerName: "Rio Helicopter Tours",
    code: "HELIRIO10",
    discountPercentage: 10,
    validUntil: "30/11/2026",
    category: "Passeios de Barco & Helicóptero",
    description: "Experiência inesquecível de 15 a 30 minutos sobrevoando o Cristo Redentor, Pão de Açúcar e praias da Zona Sul.",
    terms: "Partidas da Helisight na Lagoa Rodrigo de Freitas ou Urca.",
    popular: false
  },
  {
    id: "disc-05",
    title: "Churrascaria Fogo de Chão Botafogo: Cortesia de Caipirinha",
    partnerName: "Fogo de Chão Rio",
    code: "CAIPIRIOVIP",
    discountPercentage: 100,
    validUntil: "31/12/2026",
    category: "Restaurantes",
    description: "Rodízio completo de carnes nobres com vista espetacular para o Pão de Açúcar + Caipirinha de Cachaça artesanal de cortesia por cliente.",
    terms: "Apresente o cupom ativo no app ao garçom no início do pedido.",
    popular: true
  }
];

export const INITIAL_CHAT_THREADS: ChatThread[] = [
  {
    id: "chat-drv-01",
    partnerId: "drv-01",
    partnerName: "Carlos Eduardo Silva",
    partnerAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    partnerRole: "Driver",
    lastMessage: "Olá! Posso te buscar às 08h30 no hotel para o Cristo Redentor sem pular fila. Qual seu hotel?",
    lastMessageTime: "10:42",
    unreadCount: 1,
    isVerified: true
  },
  {
    id: "chat-drv-02",
    partnerId: "drv-02",
    partnerName: "Marcella Santos (Van VIP)",
    partnerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    partnerRole: "Driver",
    lastMessage: "Orçamento para grupo de 8 pessoas aprovado com 15% de desconto. Podemos confirmar a data?",
    lastMessageTime: "Ontem",
    unreadCount: 0,
    isVerified: true
  },
  {
    id: "chat-ginga-ai",
    partnerId: "ginga-ai",
    partnerName: "Ginga AI Concierge",
    partnerAvatar: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400",
    partnerRole: "Ginga AI Concierge",
    lastMessage: "Olá! Sou o assistente virtual do Rio. Onde você gostaria de ir hoje?",
    lastMessageTime: "Agora",
    unreadCount: 0,
    isVerified: true
  }
];

export const INITIAL_MESSAGES_STORE: Record<string, Message[]> = {
  "chat-drv-01": [
    {
      id: "m1",
      chatId: "chat-drv-01",
      senderId: "drv-01",
      senderName: "Carlos Eduardo Silva",
      senderRole: "driver",
      content: "Olá! Sejam muito bem-vindos ao Rio de Janeiro! 🌊☀️ Me chamo Carlos, sou motorista credenciado Cadastur e especialista nos passeios privativos.",
      timestamp: "10:35"
    },
    {
      id: "m2",
      chatId: "chat-drv-01",
      senderId: "user-123",
      senderName: "Você",
      senderRole: "client",
      content: "Oi Carlos! Gostaria de saber quanto fica o transfer para o Cristo Redentor e Pão de Açúcar amanhã cedo?",
      timestamp: "10:38"
    },
    {
      id: "m3",
      chatId: "chat-drv-01",
      senderId: "drv-01",
      senderName: "Carlos Eduardo Silva",
      senderRole: "driver",
      content: "Consigo fazer um valor especial com desconto da plataforma! Posso te buscar às 08h30 no hotel para o Cristo Redentor sem pular fila. Qual seu hotel?",
      timestamp: "10:42",
      quote: {
        serviceName: "City Tour Privativo 6h (Cristo + Pão de Açúcar + Escadaria)",
        amount: 380,
        date: "Amanhã - 08:30",
        status: "pending"
      }
    }
  ],
  "chat-ginga-ai": [
    {
      id: "m-ai-1",
      chatId: "chat-ginga-ai",
      senderId: "ginga-ai",
      senderName: "Ginga AI Concierge",
      senderRole: "ai_assistant",
      content: "Olá! Sou o Ginga AI, seu concierge oficial do Rio de Janeiro powered by Gemini. Posso criar roteiros sob medida, sugerir melhores horários sem filas, calcular trajetos e tirar todas as suas dúvidas sobre a Cidade Maravilhosa! Como posso te ajudar agora?",
      timestamp: "Agora"
    }
  ]
};

export const FREQUENT_QUESTIONS = [
  {
    q: "Como funciona a segurança e o pagamento dos motoristas?",
    a: "Todos os motoristas parceiros passam por checagem rigorosa de antecedentes, possuem registro no Cadastur e veículos vistoriados com ar-condicionado. O pagamento pode ser realizado diretamente na plataforma com garantia de devolução ou acertado de forma transparente antes do embarque."
  },
  {
    q: "Qual a vantagem de usar o transporte privativo em relação aos ônibus e táxis de rua?",
    a: "Com nossos motoristas indicados, você tem veículo à sua disposição durante todo o passeio, ar-condicionado constante, auxílio com ingressos, parada para fotos em mirantes exclusivos e comunicação direta sem intermediários."
  },
  {
    q: "Como resgatar os cupons de desconto nos pontos turísticos?",
    a: "Basta acessar a aba 'Descontos' do aplicativo, clicar em 'Copiar Código' ou 'Ativar Cupom' e apresentar a tela no celular ou inserir no momento da reserva do seu passeio na plataforma."
  },
  {
    q: "A comunicação pelo chat é monitorada para segurança?",
    a: "Sim, toda a comunicação entre passageiro e prestador de serviço ocorre dentro do aplicativo, garantindo suporte 24 horas da nossa equipe e histórico de todas as negociações de horários e valores."
  }
];
