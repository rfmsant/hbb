import type { T, TL } from '../i18n/ui';

// The six practice areas. `cal` decides which booking calendar receives the meeting
// (cal1, cal2 = one lawyer each; cal3 = shared). Lawyers are not named on the site.
export type Area = {
  slug: string; cal: 'cal1' | 'cal2' | 'cal3';
  title: T; short: T; lead: T;
  companies?: T; people?: T;
  matters: TL; prepare: TL;
};

export const areas: Area[] = [
  {
    slug: 'immigration', cal: 'cal1',
    title: { en: 'Immigration & Nationality', pt: 'Imigração e Nacionalidade' },
    short: { en: 'Visas and residence permits, family reunification, renewals and Portuguese nationality.', pt: 'Vistos e autorizações de residência, reagrupamento familiar, renovações e nacionalidade portuguesa.' },
    lead: {
      en: 'We advise people who want to live, work or invest in Portugal, and companies that hire from abroad, on visas, residence permits and Portuguese nationality, from the first application to renewals.',
      pt: 'Acompanhamos quem quer viver, trabalhar ou investir em Portugal, e as empresas que contratam fora do país, em vistos, autorizações de residência e nacionalidade portuguesa, do primeiro pedido às renovações.',
    },
    people: { en: 'People and families moving to Portugal, residents renewing their permits and descendants of Portuguese citizens.', pt: 'Pessoas e famílias que se mudam para Portugal, residentes que renovam a autorização e descendentes de cidadãos portugueses.' },
    companies: { en: 'Companies hiring foreign employees or moving staff to Portugal.', pt: 'Empresas que contratam trabalhadores estrangeiros ou transferem colaboradores para Portugal.' },
    matters: {
      en: ['Residence visas: D7 (passive income), D8 (remote work), D2 (entrepreneurs), study and job seeking', 'Residence permit for investment (Golden Visa)', 'Work visas and permits for employees hired from abroad', 'Family reunification', 'Renewals and permanent residence', 'Portuguese nationality: by residence, marriage or civil partnership, and descent'],
      pt: ['Vistos de residência: D7 (rendimentos passivos), D8 (trabalho remoto), D2 (empreendedores), estudo e procura de trabalho', 'Autorização de residência para investimento (Golden Visa)', 'Vistos e autorizações de trabalho para trabalhadores contratados no estrangeiro', 'Reagrupamento familiar', 'Renovações e residência permanente', 'Nacionalidade portuguesa: por residência, casamento ou união de facto, e descendência'],
    },
    prepare: {
      en: ['Passports of everyone involved', 'Your current visa or residence card, if you have one', 'A short note on your situation: income, work and family', 'Any letters already received from AIMA or a consulate'],
      pt: ['Passaportes de todas as pessoas envolvidas', 'Visto ou título de residência atual, se tiver', 'Uma breve nota da sua situação: rendimentos, trabalho e família', 'Cartas já recebidas da AIMA ou de um consulado'],
    },
  },
  {
    slug: 'contracts', cal: 'cal2',
    title: { en: 'Contracts', pt: 'Contratos' },
    short: { en: 'Drafting, review and negotiation of commercial and civil contracts.', pt: 'Redação, revisão e negociação de contratos comerciais e civis.' },
    lead: {
      en: 'We draft, review and negotiate the contracts that companies and individuals sign every day, so that each party knows what it is agreeing to before it signs.',
      pt: 'Redigimos, revemos e negociamos os contratos que empresas e particulares assinam no dia a dia, para que cada parte saiba o que está a aceitar antes de assinar.',
    },
    companies: { en: 'Companies that buy or sell goods and services, work with suppliers or distributors, or share confidential information.', pt: 'Empresas que compram ou vendem bens e serviços, trabalham com fornecedores ou distribuidores, ou partilham informação confidencial.' },
    people: { en: 'Individuals about to sign a lease, a service agreement or a contract with a builder or supplier.', pt: 'Particulares que vão assinar um arrendamento, uma prestação de serviços ou um contrato com um empreiteiro ou fornecedor.' },
    matters: {
      en: ['Service agreements and supply contracts', 'Distribution, agency and franchise agreements', 'Confidentiality agreements (NDAs)', 'Terms and conditions for websites and online sales', 'Partnership and cooperation agreements', 'Review before signing, and breach of contract'],
      pt: ['Contratos de prestação de serviços e de fornecimento', 'Contratos de distribuição, agência e franquia', 'Acordos de confidencialidade (NDA)', 'Termos e condições para sites e vendas online', 'Acordos de parceria e de cooperação', 'Revisão antes de assinar e incumprimento contratual'],
    },
    prepare: {
      en: ['The draft or signed contract, if there is one', 'Who the parties are and what each one provides', 'Key dates, amounts and deadlines', 'Emails or messages exchanged so far'],
      pt: ['A minuta ou o contrato assinado, se existir', 'Quem são as partes e o que cada uma presta', 'Datas, valores e prazos relevantes', 'Emails ou mensagens trocados até agora'],
    },
  },
  {
    slug: 'employment', cal: 'cal2',
    title: { en: 'Employment Law', pt: 'Direito Laboral' },
    short: { en: 'Employment contracts, internal policies, disciplinary procedures, dismissals and disputes.', pt: 'Contratos de trabalho, regulamentos internos, processos disciplinares, despedimentos e litígios.' },
    lead: {
      en: 'We advise employers and employees on the whole working relationship under the Portuguese Labour Code, from the first contract to its end.',
      pt: 'Aconselhamos empregadores e trabalhadores em toda a relação de trabalho, à luz do Código do Trabalho, do primeiro contrato ao fim da relação.',
    },
    companies: { en: 'Employers hiring in Portugal, setting internal rules or handling a disciplinary procedure or dismissal.', pt: 'Empregadores que contratam em Portugal, definem regras internas ou gerem um processo disciplinar ou um despedimento.' },
    people: { en: 'Employees who want a review of an employment contract, a termination agreement or a dismissal.', pt: 'Trabalhadores que querem rever um contrato de trabalho, um acordo de cessação ou um despedimento.' },
    matters: {
      en: ['Employment contracts: open-ended, fixed-term and remote work', 'Internal regulations and company policies', 'Disciplinary procedures', 'Dismissals and termination agreements', 'Hiring foreign employees, together with the immigration area', 'Labour disputes and Labour Authority (ACT) inspections'],
      pt: ['Contratos de trabalho: sem termo, a termo e teletrabalho', 'Regulamentos internos e políticas da empresa', 'Processos disciplinares', 'Despedimentos e acordos de cessação', 'Contratação de trabalhadores estrangeiros, com a área de imigração', 'Litígios laborais e inspeções da ACT'],
    },
    prepare: {
      en: ['The employment contract and any later changes', 'Recent payslips', 'Internal rules or policies that apply', 'Letters, emails or notices already exchanged'],
      pt: ['Contrato de trabalho e alterações posteriores', 'Recibos de vencimento recentes', 'Regulamentos ou políticas internas aplicáveis', 'Cartas, emails ou comunicações já trocados'],
    },
  },
  {
    slug: 'corporate', cal: 'cal3',
    title: { en: 'Corporate & Commercial Law', pt: 'Direito Comercial e das Empresas' },
    short: { en: 'Company formation, shareholder agreements, corporate changes and day-to-day company law.', pt: 'Constituição de sociedades, acordos parassociais, alterações societárias e o dia a dia jurídico da empresa.' },
    lead: {
      en: 'We support companies from formation onwards: how the company is set up, how the partners relate to each other and the corporate acts each decision requires.',
      pt: 'Acompanhamos as empresas desde a constituição: a forma como a sociedade é criada, a relação entre os sócios e os atos societários que cada decisão exige.',
    },
    companies: { en: 'Founders, Portuguese and foreign companies, and partners who want to change how their company works.', pt: 'Fundadores, empresas portuguesas e estrangeiras e sócios que querem mudar o funcionamento da sua sociedade.' },
    people: { en: 'People moving to Portugal who want to start a business here or bring one with them.', pt: 'Quem se muda para Portugal e quer criar um negócio cá ou trazer o seu.' },
    matters: {
      en: ['Company formation and choice of company type', 'Shareholder agreements', 'Share transfers and capital increases', 'General meetings, minutes and corporate records', 'Branches and subsidiaries of foreign companies', 'Commercial registration and the beneficial owner register (RCBE)'],
      pt: ['Constituição de sociedades e escolha do tipo de sociedade', 'Acordos parassociais', 'Cessão de quotas e aumentos de capital', 'Assembleias gerais, atas e registos societários', 'Sucursais e filiais de empresas estrangeiras', 'Registo comercial e Registo Central do Beneficiário Efetivo (RCBE)'],
    },
    prepare: {
      en: ["The company's permanent certificate code, if it already exists", 'Articles of association and any shareholder agreement', 'Who the partners are and what each one holds', 'What you want to change or achieve'],
      pt: ['Código da certidão permanente, se a sociedade já existir', 'Pacto social e acordos parassociais', 'Quem são os sócios e a participação de cada um', 'O que pretende alterar ou alcançar'],
    },
  },
  {
    slug: 'real-estate', cal: 'cal2',
    title: { en: 'Real Estate', pt: 'Imobiliário' },
    short: { en: 'Buying, selling and renting property: checks, contracts and deeds.', pt: 'Compra, venda e arrendamento de imóveis: verificações, contratos e escrituras.' },
    lead: {
      en: 'We check the property and its paperwork before you commit, and prepare and review the contracts for buying, selling or renting homes and commercial premises.',
      pt: 'Verificamos o imóvel e a documentação antes de se comprometer e preparamos e revemos os contratos de compra, venda e arrendamento de habitação e de espaços comerciais.',
    },
    companies: { en: 'Companies renting or buying offices, shops or warehouses, and owners letting commercial premises.', pt: 'Empresas que arrendam ou compram escritórios, lojas ou armazéns e proprietários que arrendam espaços comerciais.' },
    people: { en: 'People buying or renting a home in Portugal, including those who still live abroad.', pt: 'Quem compra ou arrenda casa em Portugal, incluindo quem ainda vive no estrangeiro.' },
    matters: {
      en: ['Legal checks before buying: land registry, tax record and licences', 'Promissory contracts of purchase and sale (CPCV)', 'Deeds and registration', 'Residential and commercial leases', 'Purchases by power of attorney, for buyers abroad', 'Condominium and neighbour issues'],
      pt: ['Verificação jurídica antes da compra: registo predial, caderneta e licenças', 'Contratos-promessa de compra e venda (CPCV)', 'Escrituras e registos', 'Arrendamento habitacional e comercial', 'Compras por procuração, para quem está no estrangeiro', 'Questões de condomínio e de vizinhança'],
    },
    prepare: {
      en: ['The property address or the listing', 'Land registry certificate and tax record (caderneta predial), if you have them', 'Any draft contract or offer received', 'Your timeline and how you plan to pay'],
      pt: ['Morada do imóvel ou o anúncio', 'Certidão do registo predial e caderneta predial, se as tiver', 'Minuta de contrato ou proposta recebida', 'Calendário previsto e forma de pagamento'],
    },
  },
  {
    slug: 'data-protection', cal: 'cal2',
    title: { en: 'GDPR & Compliance', pt: 'RGPD e Compliance' },
    short: { en: 'Data protection, whistleblowing channels and corruption-prevention programmes.', pt: 'Proteção de dados, canais de denúncia e programas de prevenção da corrupção.' },
    lead: {
      en: 'We help companies meet their data-protection and compliance obligations, with documents and procedures they can use day to day.',
      pt: 'Ajudamos as empresas a cumprir as obrigações de proteção de dados e de compliance, com documentos e procedimentos que conseguem usar no dia a dia.',
    },
    companies: { en: 'Companies that process customer or employee data, and organisations required to have a whistleblowing channel or a corruption-prevention plan.', pt: 'Empresas que tratam dados de clientes ou de trabalhadores e entidades obrigadas a ter canal de denúncia ou plano de prevenção da corrupção.' },
    people: { en: 'Individuals who want to exercise their rights over their personal data.', pt: 'Particulares que querem exercer os seus direitos sobre os dados pessoais.' },
    matters: {
      en: ['GDPR review and gap analysis', 'Privacy and cookie policies, records of processing activities', 'Data processing agreements with suppliers', 'Data subject requests and personal data breaches', 'Whistleblowing channels (Law 93/2021)', 'Corruption-prevention programmes (RGPC)'],
      pt: ['Diagnóstico de conformidade com o RGPD', 'Políticas de privacidade e de cookies e registo das atividades de tratamento', 'Acordos de subcontratação com fornecedores', 'Pedidos dos titulares e violações de dados pessoais', 'Canais de denúncia (Lei n.º 93/2021)', 'Programas de prevenção da corrupção (RGPC)'],
    },
    prepare: {
      en: ['What personal data the company collects and why', 'Your current privacy policy and forms', 'Main suppliers that handle data (software, payroll, marketing)', 'Number of employees'],
      pt: ['Que dados pessoais a empresa recolhe e para quê', 'Política de privacidade e formulários atuais', 'Principais fornecedores que tratam dados (software, salários, marketing)', 'Número de trabalhadores'],
    },
  },
];

export const areaBySlug = (s: string) => areas.find((a) => a.slug === s)!;

// The two ways in: companies and people moving to Portugal. Each situation points to an area.
export const paths = {
  companies: {
    enPath: '/for-companies/',
    eyebrow: { en: 'For companies', pt: 'Empresas' },
    title: { en: 'Legal support for companies in Portugal.', pt: 'Apoio jurídico para empresas em Portugal.' },
    lead: { en: 'Contracts, employment, company law, premises, data protection and hiring from abroad. Six areas, one team.', pt: 'Contratos, direito laboral, direito comercial, instalações, proteção de dados e contratação de estrangeiros. Seis áreas, uma equipa.' },
    situations: [
      { area: 'corporate', en: 'Starting a company, or bringing a foreign company to Portugal', pt: 'Criar uma empresa ou trazer uma empresa estrangeira para Portugal' },
      { area: 'employment', en: 'Hiring, managing or letting go of employees', pt: 'Contratar, gerir ou terminar contratos com trabalhadores' },
      { area: 'contracts', en: 'Contracts with clients, suppliers and partners', pt: 'Contratos com clientes, fornecedores e parceiros' },
      { area: 'real-estate', en: 'Renting or buying offices, shops or warehouses', pt: 'Arrendar ou comprar escritórios, lojas ou armazéns' },
      { area: 'data-protection', en: 'GDPR, whistleblowing channel and compliance', pt: 'RGPD, canal de denúncias e compliance' },
      { area: 'immigration', en: 'Hiring people from outside the EU', pt: 'Contratar pessoas de fora da União Europeia' },
    ],
  },
  people: {
    enPath: '/moving-to-portugal/',
    eyebrow: { en: 'Moving to Portugal', pt: 'Mudar-se para Portugal' },
    title: { en: 'Moving to Portugal: visas, home and nationality.', pt: 'Mudar-se para Portugal: vistos, casa e nacionalidade.' },
    lead: { en: 'Visas and residence, nationality, buying or renting a home, contracts and starting a business, in Portuguese and English.', pt: 'Vistos e residência, nacionalidade, compra ou arrendamento de casa, contratos e criação de empresa, em português e inglês.' },
    situations: [
      { area: 'immigration', en: 'Choosing a visa and applying for residence', pt: 'Escolher o visto e pedir a autorização de residência' },
      { area: 'immigration', en: 'Bringing your family', pt: 'Trazer a família' },
      { area: 'immigration', en: 'Applying for Portuguese nationality', pt: 'Pedir a nacionalidade portuguesa' },
      { area: 'real-estate', en: 'Buying or renting a home', pt: 'Comprar ou arrendar casa' },
      { area: 'employment', en: 'Reviewing a job offer or employment contract', pt: 'Rever uma proposta ou um contrato de trabalho' },
      { area: 'corporate', en: 'Starting a business in Portugal', pt: 'Criar um negócio em Portugal' },
    ],
  },
} as const;

// How the first meeting works, shown on several pages.
export const meetingSteps = {
  en: [
    ['Tell us the area and the subject', 'A few short questions, so the lawyer responsible for that area can prepare.'],
    ['Choose a date and format', 'By video, by phone or in person in Lisbon, in Portuguese or English.'],
    ['Meet the lawyer for the area', 'You explain the situation; the lawyer explains the options and the next steps. Before any work starts, you receive a written proposal.'],
  ],
  pt: [
    ['Indique a área e o assunto', 'Algumas perguntas curtas, para que a advogada responsável pela área possa preparar a reunião.'],
    ['Escolha a data e o formato', 'Por videochamada, por telefone ou presencialmente em Lisboa, em português ou inglês.'],
    ['Reunião com a advogada da área', 'Explica a situação; a advogada explica as opções e os próximos passos. Antes de qualquer trabalho, recebe uma proposta escrita.'],
  ],
} as const;
