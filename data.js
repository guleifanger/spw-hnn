// hnn.spwbrasil.org.br — protótipo conceitual
// ATENÇÃO: TODOS os dados aqui são EXEMPLOS FICTÍCIOS. Não use clinicamente.
// Lógica de ranqueamento e dados clínicos adotados a partir do protótipo de
// referência fornecido pelo Marco (matriz de pesos, EXAMS com priority/condition,
// SYN indexado de 0 a 11). Preserva fielmente a estrutura clínica original.

const SYN_DETAILS = {
  0: { sigla:'AME', gene:'SMN1 (5q13)', desc:'Doença do neurônio motor inferior por deleção/mutação do SMN1. Fraqueza proximal progressiva, arreflexia, fasciculações de língua, sem comprometimento cognitivo. Há tratamentos aprovados — diagnóstico precoce é urgente.', chave:['Arreflexia','Fasciculações de língua','Fraqueza proximal','Olhar atento preservado','Sem dismorfias'] },
  1: { sigla:'HC', gene:'multifatorial', desc:'Triado no teste do pezinho. Letargia, icterícia prolongada, macroglossia, mixedema, choro rouco, hipotermia, hipotonia leve a moderada. Tratável e reversível se identificado precocemente.', chave:['Macroglossia','Edema/mixedema','Letargia','Icterícia prolongada'] },
  2: { sigla:'AS', gene:'15q11-q13 (materna) / UBE3A', desc:'Geralmente não se manifesta com hipotonia grave no neonato (manifestações claras aparecem entre 6-12 meses). Pode haver dificuldade alimentar leve. Microcefalia se desenvolve depois.', chave:['Sorriso excessivo','Microcefalia (tardia)','Reflexos normais ou exaltados'] },
  3: { sigla:'DM1', gene:'DMPK (expansão CTG)', desc:'Doença autossômica dominante por expansão CTG em DMPK. Forma congênita grave = sempre transmissão materna (antecipação). O diagnóstico na mãe frequentemente é feito pelo filho. Polidrâmnio, artrogripose e insuficiência respiratória são comuns na forma congênita.', chave:['Mãe com miotonia ou fraqueza','Face miopática','Ptose palpebral bilateral','Polidrâmnio','Artrogripose possível'] },
  4: { sigla:'CMS', gene:'CHRNE, RAPSN, COLQ, DOK7 e outros', desc:'Falha na junção neuromuscular por mutação em genes da placa motora. Fraqueza flutuante (fatigabilidade), ptose, oftalmoplegia, frequentemente herança autossômica recessiva.', chave:['Fatigabilidade','Ptose palpebral','Oftalmoplegia','Consanguinidade'] },
  5: { sigla:'MC', gene:'múltiplos (RYR1, NEB, ACTA1, MTM1 …)', desc:'Grupo heterogêneo de miopatias estruturais (nemalínica, central core, centronuclear). Hipotonia grave, fraqueza não-progressiva, reflexos diminuídos ou ausentes, sem fasciculações.', chave:['Hipotonia grave','Reflexos diminuídos','Insuficiência respiratória','Sem fasciculações'] },
  6: { sigla:'PWS', gene:'15q11-q13 (paterna)', desc:'Hipotonia central grave no neonato, sucção pobre, choro fraco, hipogonadismo, acromicria e hipopigmentação relativa. Polidrâmnio e movimentação fetal reduzida são pistas pré-natais frequentes.', chave:['Olhos amendoados','Sucção pobre','Hipogonadismo','Acromicria','Hipopigmentação'] },
  7: { sigla:'PHS', gene:'TCF4', desc:'Mutação no TCF4. Hipotonia neonatal moderada a grave, dificuldade alimentar, dismorfia facial característica (lábio em M, filtro profundo, boca larga), episódios respiratórios anormais (hiperventilação seguida de apneia) frequentemente aparecem depois.', chave:['Lábio em M','Hiperventilação seguida de apneia','Microcefalia'] },
  8: { sigla:'PMS', gene:'22q13.3 / SHANK3', desc:'Deleção 22q13 / SHANK3. Hipotonia neonatal, atraso global, dismorfia mínima, frequentemente diminuição da resposta à dor. Diagnóstico geralmente por microarranjo.', chave:['Reduzida resposta à dor','Hipotonia neonatal','Dismorfia mínima'] },
  9: { sigla:'1p36', gene:'deleção 1p36', desc:'Deleção terminal 1p36. Hipotonia, microcefalia, dismorfia (sobrancelhas retas, queixo retraído), cardiopatia congênita comum, convulsões.', chave:['Microcefalia','Sobrancelhas retas','Cardiopatia congênita','Convulsões'] },
  10:{ sigla:'TS14', gene:'14q32 (UPD materna)', desc:'Disomia uniparental materna do cromossomo 14. Hipotonia neonatal, restrição de crescimento intrauterino (SGA), dificuldade alimentar, acromicria, hipoglicemia, hipogonadismo.', chave:['SGA','Acromicria','Hipoglicemia','Hipogonadismo'] },
  11:{ sigla:'SYS', gene:'MAGEL2', desc:'Mutações de perda de função em MAGEL2 (15q11). Clinicamente similar a Prader-Willi mas com artrogripose neonatal, hipoventilação grave e mortalidade neonatal elevada. Metilação 15q e microarray podem ser normais — diagnóstico exige sequenciamento de MAGEL2.', chave:['Artrogripose neonatal','Hipoventilação neonatal grave','Similar a Prader-Willi'] },
}
const SYN = [
  {name:"AME / SMA",            color:"#c0392b",bg:"#fde8e8"},
  {name:"Hipotireoidismo Cong.",color:"#d68910",bg:"#fef3cd"},
  {name:"Angelman",             color:"#e67e22",bg:"#fff3e0"},
  {name:"Distrofia Miotônica",  color:"#8e44ad",bg:"#f3e5f5"},
  {name:"Miastenia Congênita",  color:"#1565c0",bg:"#e3f2fd"},
  {name:"Miopatia Congênita",   color:"#00695c",bg:"#e0f7fa"},
  {name:"Prader-Willi",         color:"#c2185b",bg:"#fce4ec"},
  {name:"Pitt-Hopkins",         color:"#4527a0",bg:"#ede7f6"},
  {name:"Phelan-McDermid",      color:"#2e7d32",bg:"#e8f5e9"},
  {name:"Deleção 1p36",        color:"#4e342e",bg:"#efebe9"},
  {name:"Temple",               color:"#00796b",bg:"#e0f2f1"},
  {name:"Schaff-Yang",          color:"#424242",bg:"#fafafa"},
];

// ════════════════════════════════════════════════════
// PERGUNTAS — sem mencionar diagnósticos
// ════════════════════════════════════════════════════
const SECTIONS=[
{title:"História Gestacional e Perinatal",subtitle:"Período pré-natal, parto e primeiras horas de vida",icon:"🤰",num:1,questions:[
  {id:"q_movfetal",text:"Movimentos fetais durante a gestação",hint:"Compare com gestações anteriores ou com o esperado para a idade gestacional.",options:[
    {label:"Normais ou aumentados",scores:{}},
    {label:"Reduzidos no 3º trimestre",scores:{0:3,3:2,5:2,11:2}},
    {label:"Muito reduzidos / ausentes",scores:{0:5,3:3,5:3,11:3}},
    {label:"Não observado / não sabe",scores:{}},
  ]},
  {id:"q_polid",text:"Polidrâmnio durante a gestação?",hint:"Excesso de líquido amniótico — pode ser sinal de dificuldade de deglutição fetal.",options:[
    {label:"Sim",scores:{3:3,0:2,5:2,11:2,4:2}},
    {label:"Não",scores:{}},
    {label:"Não sabe",scores:{}},
  ]},
  {id:"q_artrog",text:"Artrogripose (contracturas articulares fixas) ao nascimento?",hint:"Posições articulares fixas por imobilidade fetal prolongada.",alert:"⚠️ Achado de alta relevância — restringe consideravelmente o diagnóstico diferencial.",options:[
    {label:"Sim, múltiplas articulações",scores:{11:7,3:4,5:3}},
    {label:"Sim, leve / pauciarticular",scores:{11:3,3:2,5:2}},
    {label:"Não",scores:{11:-2}},
  ]},
  {id:"q_pezinho",text:"Teste do pezinho — TSH estava alterado?",hint:"O TSH elevado no pezinho é triagem para hipotireoidismo congênito.",options:[
    {label:"Sim — TSH elevado / retestagem solicitada",scores:{1:15}},
    {label:"Não — resultado normal",scores:{1:-8}},
    {label:"Não foi feito / resultado desconhecido",scores:{}},
  ]},
  {id:"q_suc",text:"Dificuldade de sucção / deglutição no período neonatal?",hint:"Houve necessidade de sonda nasogástrica ou dificuldade acentuada para mamar?",options:[
    {label:"Sim, grave (necessitou sonda)",scores:{0:3,3:3,5:3,4:3,6:3,11:3,7:2}},
    {label:"Sim, moderada (muito lenta / cansativa)",scores:{0:2,3:2,5:2,4:2,6:2,11:2}},
    {label:"Não",scores:{}},
  ]},
  {id:"q_choro",text:"Qualidade do choro ao nascimento",hint:"O choro fraco ou ausente reflete fraqueza da musculatura respiratória ou laríngea.",alert:"⚠️ O choro é marcador sensível de comprometimento neuromuscular neonatal.",options:[
    {label:"Normal — vigoroso",scores:{}},
    {label:"Fraco — intensidade reduzida",scores:{0:3,5:3,3:2,11:2,4:2}},
    {label:"Muito fraco / quase ausente",scores:{0:5,5:4,3:3,11:3}},
    {label:"Choro rouco / estridor",scores:{1:3,3:2}},
  ]},
  {id:"q_vm",text:"Necessitou de ventilação mecânica no período neonatal?",options:[
    {label:"Sim",scores:{0:4,11:3,3:3,5:2}},
    {label:"Não",scores:{}},
  ]},
]},
{title:"História Familiar",subtitle:"Condições nos familiares e padrão de herança",icon:"👨‍👩‍👧",num:2,questions:[
  {id:"q_mae_miot",text:"A mãe apresenta dificuldade de relaxar a musculatura, fraqueza ou pálpebras caídas?",hint:"Pergunte: dificuldade de abrir a mão após apertar, fraqueza ao subir escadas, ptose, cataratas antes dos 50 anos.",alert:"⚠️ Achado de altíssima relevância diagnóstica — altera significativamente a probabilidade de condição de transmissão materna.",options:[
    {label:"Sim — claramente presente",scores:{3:12}},
    {label:"Sim — suspeito / leve",scores:{3:6}},
    {label:"Não",scores:{3:-4}},
    {label:"Não foi avaliado",scores:{}},
  ]},
  {id:"q_consang",text:"Os pais são consanguíneos (parentes entre si)?",hint:"Aumenta probabilidade de condições autossômicas recessivas.",options:[
    {label:"Sim — primos de 1º grau ou mais próximos",scores:{0:3,5:4,4:4}},
    {label:"Sim — 2º grau",scores:{0:2,5:2,4:2}},
    {label:"Não",scores:{}},
  ]},
  {id:"q_famhx",text:"Outros familiares com condição neuromuscular ou hipotonia similar?",hint:"Múltiplas gerações = dominante. Apenas irmãos = recessivo. Lado materno = ligado ao X.",options:[
    {label:"Sim — múltiplas gerações (avô, pai)",scores:{3:4}},
    {label:"Sim — apenas irmãos / mesmo casal",scores:{0:3,5:3,4:3}},
    {label:"Sim — familiares do lado materno",scores:{5:2}},
    {label:"Não / caso aparentemente isolado",scores:{2:1,6:1,7:1,8:1,9:1,10:1,11:1}},
  ]},
  {id:"q_obitoneon",text:"Histórico de natimortos ou óbitos neonatais precoces na família?",options:[
    {label:"Sim",scores:{11:3,5:2,0:2}},
    {label:"Não",scores:{}},
  ]},
]},
{title:"Padrão Neuromuscular ao Exame",subtitle:"Tônus, força, reflexos e motilidade",icon:"⚡",num:3,questions:[
  {id:"q_refl",text:"Reflexos profundos (tendinosos) ao exame",hint:"Ausentes ou muito diminuídos → hipotonia periférica. Normais ou exaltados → suspeitar causa central.",alert:"⚠️ Um dos achados mais discriminatórios na investigação de hipotonia.",options:[
    {label:"Ausentes (areflexia)",scores:{0:7,4:2}},
    {label:"Muito diminuídos (hiporreflexia)",scores:{0:3,5:3,3:3,4:3,1:2}},
    {label:"Normais",scores:{2:2,6:2,7:2,8:2,9:2,10:2,11:2}},
    {label:"Exaltados / clônus presente",scores:{2:2,9:3}},
  ]},
  {id:"q_fascic",text:"Fasciculações visíveis de língua?",hint:"Movimentos finos, vermiculares, contínuos na superfície da língua em repouso. Peça para manter a boca aberta com língua imóvel.",alert:"⚠️ Se presentes: achado altamente específico para doença do neurônio motor inferior.",options:[
    {label:"Sim — claramente visíveis",scores:{0:10}},
    {label:"Duvidoso / possível",scores:{0:4}},
    {label:"Não",scores:{0:-3}},
  ]},
  {id:"q_fraq",text:"Distribuição da fraqueza muscular",hint:"Proximal = cintura escapular e pélvica. Distal = mãos e pés. Axial = pescoço e tronco.",options:[
    {label:"Predominantemente proximal",scores:{0:3,5:3,3:2}},
    {label:"Proximal > distal (difusa)",scores:{5:2,3:2}},
    {label:"Predominantemente distal",scores:{3:3}},
    {label:"Axial / pescoço / tronco",scores:{0:2,6:2,11:2}},
    {label:"Difusa sem predomínio / sem fraqueza focal",scores:{2:2,7:2,8:2,9:2}},
  ]},
  {id:"q_fatig",text:"Fatigabilidade: piora da força ao longo de uma mamada ou esforço sustentado?",hint:"O bebê inicia a mamada com vigor e progressivamente perde força, retomando após descanso.",alert:"⚠️ Padrão de fatigabilidade é altamente específico para defeito da transmissão neuromuscular.",options:[
    {label:"Sim — claramente presente",scores:{4:9}},
    {label:"Sim — possível / suspeito",scores:{4:4}},
    {label:"Não",scores:{4:-3}},
  ]},
  {id:"q_ptose",text:"Ptose palpebral (queda das pálpebras)?",options:[
    {label:"Sim, bilateral",scores:{4:5,5:3,3:4}},
    {label:"Sim, unilateral",scores:{4:3,5:2}},
    {label:"Não",scores:{}},
  ]},
  {id:"q_oftalmo",text:"Limitação dos movimentos oculares (oftalmoplegia)?",hint:"Distinto do estrabismo convergente fisiológico neonatal.",options:[
    {label:"Sim",scores:{4:4,5:4,3:3}},
    {label:"Não",scores:{}},
  ]},
  {id:"q_miotonia",text:"Dificuldade de relaxar a musculatura após contração (miotonia)?",hint:"No neonato: ao testar o reflexo palmar, demora para abrir a mão. Piora com frio.",alert:"⚠️ Se presente: direciona fortemente para condição de transmissão materna com diagnóstico específico.",options:[
    {label:"Sim — presente ao exame",scores:{3:9}},
    {label:"Suspeito / leve",scores:{3:4}},
    {label:"Não",scores:{3:-3}},
  ]},
  {id:"q_atrofia",text:"Atrofia muscular visível ao exame?",options:[
    {label:"Sim — marcada",scores:{0:3,5:3,3:2}},
    {label:"Sim — leve / discreta",scores:{0:2,5:2}},
    {label:"Não — massa muscular normal",scores:{2:1,6:1,7:1}},
    {label:"Pseudo-hipertrofia de panturrilhas",scores:{5:3}},
  ]},
]},
{title:"Fenótipo, Dismorfias e Biometria Neonatal",subtitle:"Características físicas ao nascimento e primeiras semanas",icon:"👁️",num:4,questions:[
  {id:"q_dismorfia",text:"Dismorfias faciais marcadas ao nascimento?",hint:"Qualquer desvio do padrão facial esperado. Compare com ambos os pais.",options:[
    {label:"Sim — marcadas / claramente atípicas",scores:{7:4,9:4,2:3,6:3,8:2,10:2,11:2}},
    {label:"Sim — leves / inespecíficas",scores:{7:2,9:2,6:2,8:1,10:1}},
    {label:"Não — fenótipo facial sem alterações",scores:{0:3,4:2}},
  ]},
  {id:"q_face",text:"Qual padrão facial predomina?",hint:"Selecione o que melhor descreve a face.",options:[
    {label:"Face longa, boca aberta em repouso, palato ogival",scores:{5:3,3:4}},
    {label:"Face arredondada, olhos amendoados, filtro longo",scores:{6:5,11:3}},
    {label:"Lábio superior em M (cupido), filtro profundo, boca larga",scores:{7:8}},
    {label:"Sobrancelhas retas e horizontais, olhos fundos",scores:{9:4}},
    {label:"Macroglossia, fontanela anterior muito ampla",scores:{1:5}},
    {label:"Maçãs salientes, queixo proeminente",scores:{8:3}},
    {label:"Nenhum padrão específico identificado",scores:{}},
  ]},
  {id:"q_hipopig",text:"Hipopigmentação relativa (pele / cabelo / olhos mais claros que os pais)?",hint:"Compare com ambos os genitores — a diferença pode ser sutil.",options:[
    {label:"Sim — claramente mais claro",scores:{6:4,2:4}},
    {label:"Sim — discretamente",scores:{6:2,2:2}},
    {label:"Não",scores:{}},
  ]},
  {id:"q_acrom",text:"Mãos e pés desproporcionalmente pequenos ao nascimento (acromicria)?",options:[
    {label:"Sim — marcado",scores:{6:6,10:4}},
    {label:"Sim — borderline",scores:{6:2,10:2}},
    {label:"Não",scores:{}},
  ]},
  {id:"q_hipog",text:"Hipogonadismo ao nascimento (criptorquidia, escroto hipoplásico, micropênis)?",options:[
    {label:"Sim",scores:{6:5,11:4,10:4}},
    {label:"Não",scores:{}},
  ]},
  {id:"q_pc",text:"Perímetro cefálico ao nascimento",options:[
    {label:"Microcefalia (PC < p3 para IG)",scores:{9:4,2:3}},
    {label:"Normal (p3–p97)",scores:{}},
    {label:"Macrocefalia (PC > p97)",scores:{}},
    {label:"Não medido",scores:{}},
  ]},
  {id:"q_sga",text:"Peso e comprimento ao nascimento",options:[
    {label:"SGA — abaixo do p10 para a idade gestacional",scores:{10:5}},
    {label:"AGA — adequado (p10 a p90)",scores:{}},
    {label:"GGA — grande para a IG",scores:{}},
  ]},
  {id:"q_cardio",text:"Cardiopatia congênita estrutural?",options:[
    {label:"Sim — confirmada",scores:{9:4,8:2,11:2}},
    {label:"Suspeita / não investigado",scores:{9:2,8:1}},
    {label:"Não",scores:{}},
  ]},
  {id:"q_edema",text:"Edema facial / mixedema ao nascimento?",hint:"Face inchada, pele pastosa, icterícia prolongada, constipação.",options:[
    {label:"Sim — presente",scores:{1:5}},
    {label:"Não",scores:{1:-1}},
  ]},
]},
{title:"Achados Neurológicos Neonatais",subtitle:"Alerta, resposta a estímulos e padrão respiratório",icon:"🧠",num:5,questions:[
  {id:"q_alerta",text:"Nível de alerta e responsividade do neonato",hint:"O bebê abre os olhos espontaneamente? Segue rostos? Reage a sons? Tem períodos de alerta claro?",options:[
    {label:"Alerta normal — reativo",scores:{0:2,4:2,5:2}},
    {label:"Discretamente sonolento mas responsivo",scores:{1:2,6:2}},
    {label:"Muito sonolento / difícil de despertar",scores:{6:3,11:3,1:3,7:2}},
    {label:"Praticamente não responde a estímulos",scores:{11:3,7:3}},
  ]},
  {id:"q_resp",text:"Padrão respiratório no período neonatal / primeiras semanas",hint:"Observe em repouso e durante sono. Registre qualquer irregularidade.",alert:"⚠️ Episódios de hiperventilação seguidos de apneia são achado altamente específico que estreita muito o diagnóstico.",options:[
    {label:"Regular e normal",scores:{7:-3}},
    {label:"Taquipneia por fraqueza muscular respiratória",scores:{0:3,5:2,11:2}},
    {label:"Apneias sem padrão específico",scores:{0:2,3:2}},
    {label:"Episódios de hiperventilação seguidos de apneia (respiração episódica)",scores:{7:14}},
    {label:"Estridor laríngeo de repouso",scores:{3:2,5:2}},
  ]},
  {id:"q_epil",text:"Crises convulsivas no período neonatal?",hint:"Desvio do olhar, movimentos de pedalada, posturas tônicas, apneia — confirmar com EEG.",options:[
    {label:"Sim — crises confirmadas",scores:{2:4,9:4,7:3}},
    {label:"Sim — suspeita / a investigar",scores:{2:2,9:2,7:1}},
    {label:"Não",scores:{0:2}},
  ]},
  {id:"q_dor",text:"Resposta a estímulos dolorosos (punção venosa, procedimentos)",hint:"O bebê chora e reage com intensidade esperada?",alert:"⚠️ Resposta claramente diminuída ou ausente à dor é achado incomum e altamente específico.",options:[
    {label:"Normal — chora e reage como esperado",scores:{8:-1}},
    {label:"Reduzida — reação atenuada",scores:{8:5}},
    {label:"Ausente — sem reação a procedimentos dolorosos",scores:{8:8}},
    {label:"Não avaliado formalmente",scores:{}},
  ]},
  {id:"q_social",text:"Reatividade social precoce — fixação e seguimento do rosto do examinador",hint:"A partir de 2–4 semanas o neonato começa a fixar e seguir rostos. Com >6 semanas: sorriso social responsivo.",options:[
    {label:"Normal para a idade",scores:{}},
    {label:"Excessiva — sorriso muito frequente e desproporcional",scores:{2:5}},
    {label:"Reduzida — pouco contato visual, pouco responsivo",scores:{7:2,8:3,9:2}},
    {label:"Muito precoce para avaliar (<2 semanas)",scores:{}},
  ]},
  {id:"q_reflexpr",text:"Reflexos primitivos neonatais (Moro, preensão palmar, sucção, Babinski)",options:[
    {label:"Presentes e simétricos",scores:{}},
    {label:"Diminuídos / incompletos",scores:{0:2,3:2,5:2,6:2}},
    {label:"Ausentes",scores:{0:3,3:3,5:3,11:2}},
    {label:"Assimétricos",scores:{}},
  ]},
]},
{title:"Exames Já Realizados",subtitle:"Se algum resultado já disponível, informe para ajustar recomendações",icon:"🔬",num:6,questions:[
  {id:"q_ck",text:"CK sérica — resultado",options:[
    {label:"Não realizada",scores:{}},
    {label:"Normal (<2× LSN)",scores:{5:-4,3:-1}},
    {label:"Levemente elevada (2–5× LSN)",scores:{5:3,3:2,0:1}},
    {label:"Muito elevada (>5× LSN)",scores:{5:6,3:3}},
  ]},
  {id:"q_tsh",text:"TSH e T4 livre — resultado",options:[
    {label:"Não realizado",scores:{}},
    {label:"Normal",scores:{1:-6}},
    {label:"TSH elevado / T4 baixo",scores:{1:12}},
  ]},
  {id:"q_emg",text:"Eletroneuromiografia (EMG/ENG) — resultado",options:[
    {label:"Não realizada",scores:{}},
    {label:"Normal",scores:{}},
    {label:"Padrão neuropático (fibrilações, desnervação)",scores:{0:7}},
    {label:"Padrão miopático (PAUM baixa amplitude)",scores:{5:7,3:3}},
    {label:"Decremento na estimulação repetitiva (JNM)",scores:{4:10}},
    {label:"Descarregamento miotônico",scores:{3:8}},
  ]},
  {id:"q_microarray",text:"Microarray cromossômico — resultado",options:[
    {label:"Não realizado",scores:{}},
    {label:"Normal (sem deleção/duplicação)",scores:{2:-1,6:-1,7:-1,8:-6,9:-6,10:-1,11:-1}},
    {label:"Alterado — variante patogênica encontrada",scores:{2:5,6:5,7:5,8:5,9:5,10:5,11:5}},
  ]},
  // NOTA CLÍNICA IMPORTANTE: microarray normal NÃO afasta Prader-Willi nem Angelman
  {id:"q_smn1",text:"Análise molecular SMN1 — resultado",options:[
    {label:"Não realizada",scores:{}},
    {label:"Deleção detectada",scores:{0:20}},
    {label:"Normal — sem deleção",scores:{0:-12}},
  ]},
  {id:"q_metil",text:"Teste de metilação 15q11-q13 — resultado",options:[
    {label:"Não realizado",scores:{}},
    {label:"Padrão materno alterado (Prader-Willi)",scores:{6:18}},
    {label:"Padrão paterno alterado (Angelman)",scores:{2:18}},
    {label:"Normal — biparental",scores:{6:-6,2:-4}},
  ]},
]},
];

// ════════════════════════════════════════════════════
// EXAMES — com disponibilidade e associações
// covers: índices de síndromes que este exame avalia
// ════════════════════════════════════════════════════
const EXAMS=[
{
  id:"ck",priority:1,
  name:"Creatinoquinase (CK) sérica total",
  covers:[3,4,5],
  rationale:"Exame simples e barato que mede uma enzima liberada quando o músculo está sendo lesado. Deve ser o primeiro exame pedido em qualquer bebê com hipotonia. Resultado baixo sugere que o problema não está no músculo em si.",
  interpretation:"<strong>Normal:</strong> O músculo não está sendo destruído — o problema provavelmente está no neurônio, no nervo ou na transmissão nervosa. <strong>2 a 5 vezes acima do normal:</strong> Possível doença muscular — pedir EMG e biópsia. <strong>Mais de 5 vezes acima do normal:</strong> Doença muscular grave — indicar biópsia muscular com urgência.",
  sus:{sim:true,codigo:"02.02.05.046-3",nome:"DOSAGEM DE CREATINOFOSFOQUINASE (CPK/CK)"},
  particular:true,
  associacoes:[],
  condition:()=>true,
  excludeIf:["q_ck"]
},
{
  id:"tsh",priority:1,
  name:"TSH e T4 livre",
  covers:[1],
  rationale:"O teste do pezinho triou, mas pode ter resultado falso-negativo — especialmente nas formas mais leves. O diagnóstico precoce do hipotireoidismo é urgente: o tratamento com levotiroxina, se feito nos primeiros meses, evita sequelas cognitivas permanentes. Exame de baixo custo e alta importância.",
  interpretation:"<strong>TSH alto e T4 baixo:</strong> Hipotireoidismo — iniciar levotiroxina e encaminhar endocrinologia pediátrica com urgência. <strong>Resultado normal:</strong> Hipotireoidismo afastado como causa principal da hipotonia.",
  sus:{sim:true,codigo:"02.02.05.141-9 / 02.02.05.137-0",nome:"DOSAGEM DE TIROTROPINA (TSH) + TIROXINA LIVRE (T4L)"},
  particular:true,
  associacoes:[{nome:"APAE Brasil",url:"https://apaebrasil.org.br",busca:"APAE Brasil hipotireoidismo congênito"}],
  condition:(ans)=>!ans['q_pezinho']||ans['q_pezinho']!=='Não — resultado normal',
  excludeIf:["q_tsh"]
},
{
  id:"lactato",priority:1,
  name:"Lactato e piruvato séricos + aminoácidos plasmáticos",
  covers:[],
  rationale:"Triagem para excluir doenças metabólicas (mitocondriais e de aminoácidos) que podem causar hipotonia. Coletar em repouso, sem choro prolongado ou estresse — o estresse eleva o lactato e pode dar resultado falso.",
  interpretation:"<strong>Lactato alto em repouso:</strong> Suspeita de doença mitocondrial — investigar com ressonância de encéfalo com espectroscopia e encaminhar à genética ou neurologia pediátrica. <strong>Normal:</strong> Doença mitocondrial menos provável — mas não totalmente excluída.",
  sus:{sim:true,codigo:"02.02.02.018-9",nome:"DOSAGEM DE LACTATO"},
  particular:true,
  associacoes:[],
  condition:()=>true,
  excludeIf:[]
},
{
  id:"smn1",priority:1,
  name:"Análise molecular SMN1 — MLPA / PCR quantitativa (éxons 7 e 8)",
  covers:[0],
  rationale:"Exame de sangue que detecta a alteração no gene responsável pela AME (Amiotrofia Espinhal). Presente em 95% dos casos. O diagnóstico rápido é urgente: existem três tratamentos aprovados no Brasil (Nusinersen, Zolgensma, Risdiplam) que mudam radicalmente o prognóstico — quanto mais cedo tratado, melhor o resultado.",
  interpretation:"<strong>Deleção detectada:</strong> Diagnóstico de AME confirmado — encaminhar com urgência a serviço especializado para definir tipo e tratamento. <strong>Normal:</strong> Afasta 95% dos casos de AME — se suspeita continua forte, pedir sequenciamento completo do gene SMN1.",
  sus:{parcial:true,nota:"Disponível em centros de referência do SUS (HC-USP, FIOCRUZ, HCFMRP-Ribeirão Preto). Pode requerer encaminhamento. Verificar disponibilidade no estado."},
  particular:true,
  associacoes:[
    {nome:"Instituto SMA Brasil",url:"https://www.institutosma.org.br",busca:"Instituto SMA Brasil apoio diagnóstico"},
    {nome:"Vidas Raras",url:"https://vidasraras.org.br",busca:"Vidas Raras Brasil doenças raras"},
  ],
  condition:(ans,top)=>top.includes(0)||ans['q_refl']==='Ausentes (areflexia)'||ans['q_fascic']==='Sim — claramente visíveis',
  excludeIf:["q_smn1"]
},
{
  id:"microarray",priority:1,
  name:"Microarray Cromossômico (SNP-array ou CGH-array)",
  covers:[2,6,7,8,9,10,11],
  rationale:"Analisa o DNA inteiro em busca de pedaços faltando ou duplicados no genoma. Um único exame rastreia várias condições ao mesmo tempo. ⚠️ <strong>ATENÇÃO: resultado normal NÃO afasta as seguintes condições:</strong> (1) <strong>Prader-Willi e Angelman</strong> — o padrão-ouro é o teste de metilação 15q (pedido junto); (2) <strong>Pitt-Hopkins</strong> — metade dos casos é por mutação de ponto no gene TCF4, invisível ao microarray; (3) <strong>Temple</strong> — a causa mais comum (dissomia uniparental do cromossomo 14) só aparece em SNP-array com análise de ROH, não em CGH-array convencional; o padrão-ouro é a metilação 14q32.",
  interpretation:"<strong>Deleção em 15q11:</strong> Pedir metilação 15q para saber qual das duas condições. <strong>Deleção 18q21 (TCF4):</strong> Confirma Pitt-Hopkins por deleção — mas normal não exclui. <strong>ROH 14q32 (SNP-array):</strong> Pode indicar UPD14 materna (Temple). <strong>Deleção em 22q13.3:</strong> Investigar Phelan-McDermid. <strong>Deleção em 1p36:</strong> Confirma Deleção 1p36. <strong>Normal:</strong> NÃO afasta Prader-Willi, Angelman, Pitt-Hopkins, Temple, AME, miastenia nem miopatias — cada uma exige teste específico.",
  sus:{parcial:true,nota:"Disponível em centros de referência do SUS (HC-USP, FIOCRUZ, HCFMRP-Ribeirão Preto). Não disponível em laboratórios SUS de rotina. Encaminhar à genética clínica do estado para solicitação."},
  particular:true,
  associacoes:[{nome:"ASBPR — Doenças Raras Brasil",url:"https://asbpr.org.br",busca:"ASBPR aliança brasileira doenças raras"}],
  condition:(ans,top)=>top.some(i=>[2,6,7,8,9,10,11].includes(i)),
  excludeIf:["q_microarray"]
},
{
  id:"metilacao",priority:1,
  name:"Teste de Metilação 15q11-q13 — PADRÃO-OURO para Prader-Willi e Angelman (MS-MLPA ou MS-PCR)",
  covers:[2,6],
  rationale:"Este é o exame definitivo para Prader-Willi e Angelman — não o microarray. Detecta alterações no padrão de metilação do cromossomo 15, independente da causa (deleção, dissomia uniparental ou defeito de imprinting). Confirma Prader-Willi em ~99% dos casos e Angelman em ~88%. Deve ser pedido junto ao microarray sempre que há suspeita clínica, sem esperar o resultado do microarray.",
  interpretation:"<strong>Resultado compatível com Prader-Willi:</strong> Diagnóstico confirmado — encaminhar genética para determinar o mecanismo. <strong>Resultado compatível com Angelman:</strong> Diagnóstico confirmado. <strong>Normal:</strong> Não afasta Angelman por mutação no gene UBE3A (~11% dos casos) — se suspeita clínica forte, pedir sequenciamento do UBE3A.",
  sus:{parcial:true,nota:"Disponível em centros de referência do SUS (HC-USP, FIOCRUZ, HCFMRP-Ribeirão Preto). Solicitar por encaminhamento à genética clínica. Perguntar ao serviço de referência do estado sobre disponibilidade. ✅ <strong>As associações Prader-Willi Brasil e ABSA-Angelman oferecem o teste de metilação gratuitamente — contate via QR code ao lado.</strong>"},
  particular:true,
  associacoes:[
    {nome:"ABSA — Angelman Brasil (teste gratuito)",url:"https://angelmansbrasil.org.br",busca:"ABSA Angelman Brasil exame gratuito metilação"},
    {nome:"Prader-Willi Brasil (teste gratuito)",url:"https://praderwilli.org.br",busca:"Prader Willi Brasil associação exame gratuito"},
  ],
  condition:(ans,top)=>top.some(i=>[2,6].includes(i)),
  excludeIf:["q_metil"]
},
{
  id:"emg",priority:2,
  name:"Eletroneuromiografia (EMG + ENG + estimulação repetitiva)",
  covers:[0,3,4,5],
  rationale:"Exame elétrico que analisa o funcionamento dos nervos, músculos e da ligação entre nervo e músculo (junção neuromuscular). Mostra se o problema está no nervo motor, no músculo ou na transmissão do sinal entre eles. No bebê requer técnica adaptada — solicitar serviço com experiência em neonatos.",
  interpretation:"<strong>Padrão de desnervação (neuropático):</strong> Problema no neurônio motor — investigar AME (SMN1). <strong>Padrão miopático:</strong> Problema no músculo — indicar biópsia muscular. <strong>Descargas miotônicas:</strong> Distrofia Miotônica — pedir gene DMPK com urgência. <strong>Decremento na estimulação repetitiva:</strong> Problema na junção neuromuscular — investigar miastenia.",
  sus:{sim:true,codigo:"02.11.06.022-2",nome:"ELETRONEUROMIOGRAFIA — verificar código atual em sigtap.datasus.gov.br"},
  particular:true,
  associacoes:[],
  condition:(ans,top)=>top.some(i=>[0,3,4,5].includes(i)),
  excludeIf:["q_emg"]
},
{
  id:"dmpk",priority:2,
  name:"Pesquisa de expansão no gene DMPK (Distrofia Miotônica tipo 1)",
  covers:[3],
  rationale:"Confirma Distrofia Miotônica tipo 1. Na forma grave do bebê, a mutação veio sempre da mãe. Pedir com urgência quando: a mãe tem dificuldade de relaxar os músculos (miotonia) ou fraqueza, ou quando o bebê tem hipotonia grave com face alongada, polidrâmnio ou contracturas.",
  interpretation:"<strong>Resultado normal (<50 repetições):</strong> Sem doença. <strong>50–150:</strong> Pré-mutação. <strong>>150:</strong> Diagnóstico confirmado. <strong>>1000:</strong> Forma congênita grave — explica a gravidade do quadro do bebê.",
  sus:{nao:true,nota:"Não disponível na tabela SUS de rotina. Centros universitários de pesquisa podem realizar. Encaminhar à genética clínica do estado para orientação de acesso."},
  particular:true,
  associacoes:[{nome:"ABDM — Distrofia Muscular Brasil",url:"https://www.distrofiamuscularbrasil.org.br",busca:"Distrofia Miotônica associação Brasil"}],
  condition:(ans,top)=>top.includes(3)||ans['q_mae_miot']==='Sim — claramente presente',
  excludeIf:[]
},
{
  id:"anticorpos",priority:2,
  name:"Anticorpos Anti-AChR, Anti-MuSK e Anti-LRP4",
  covers:[4],
  rationale:"Diferencia dois tipos de miastenia: a forma transitória do bebê (herdada temporariamente da mãe com miastenia, que melhora sozinha em semanas) da forma congênita permanente (defeito genético no próprio bebê, que não tem anticorpos e não melhora sem tratamento específico).",
  interpretation:"<strong>Anticorpos positivos:</strong> Miastenia transitória transferida da mãe — investigar a mãe, dar suporte ao bebê e aguardar resolução espontânea. <strong>Anticorpos negativos com quadro persistente:</strong> Forma congênita permanente — pedir painel genético específico.",
  sus:{parcial:true,nota:"Anti-AChR disponível em alguns centros de referência do SUS. Verificar no serviço de neurologia pediátrica do estado."},
  particular:true,
  associacoes:[{nome:"ABRAMI — Miastenia Brasil",url:"https://abrami.org.br",busca:"ABRAMI associação brasileira miastenia"}],
  condition:(ans,top)=>top.includes(4),
  excludeIf:[]
},
{
  id:"tcf4",priority:2,
  name:"Sequenciamento do gene TCF4",
  covers:[7],
  rationale:"O microarray detecta metade dos casos por deleção maior no gene TCF4. Para os outros 50%, que são mutações menores, é preciso sequenciar o gene diretamente. Indicado quando há o padrão respiratório característico (hiperventilação seguida de apneia) com o padrão facial específico — mesmo que o microarray tenha saído normal.",
  interpretation:"<strong>Alteração encontrada no gene TCF4:</strong> Diagnóstico confirmado. <strong>Normal:</strong> Não exclui completamente — se a suspeita continua forte, pedir exoma.",
  sus:{nao:true,nota:"Não disponível via SIGTAP de rotina. Solicitar via serviço de genética clínica ou autorização judicial em casos selecionados."},
  particular:true,
  associacoes:[{nome:"Pitt-Hopkins Research Foundation",url:"https://pitthopkins.org",busca:"Pitt Hopkins Brasil família apoio"}],
  condition:(ans,top)=>top.includes(7)||ans['q_resp']==='Episódios de hiperventilação seguidos de apneia (respiração episódica)',
  excludeIf:[]
},
{
  id:"biopsia",priority:3,
  name:"Biópsia Muscular (histoquímica + imunohistoquímica + microscopia eletrônica)",
  covers:[5],
  rationale:"Retira um pequeno fragmento de músculo para analisar ao microscópio. Identifica qual tipo de doença muscular o bebê tem — cada padrão visto na biópsia aponta para genes específicos a sequenciar depois. Coordenar com laboratório de referência em neuropatologia muscular.",
  interpretation:"<strong>Bastões de nemaline:</strong> Investigar genes NEB, ACTA1, TPM2/3. <strong>Cores centrais:</strong> Investigar gene RYR1. <strong>Núcleos centrais:</strong> Investigar genes MTM1, DNM2, BIN1. <strong>Minicores múltiplos:</strong> Investigar genes RYR1 e SELENON.",
  sus:{parcial:true,codigo:"04.08.02.019-0",nome:"BIÓPSIA DE MÚSCULO — disponível em centros terciários do SUS com neuropatologia."},
  particular:true,
  associacoes:[],
  condition:(ans,top)=>top.includes(5),
  excludeIf:[]
},
{
  id:"painel_miop",priority:3,
  name:"Painel NGS — Miopatias Congênitas (RYR1, ACTA1, NEB, TPM2, TPM3, DNM2, MTM1, BIN1, SELENON, TTN…)",
  covers:[5],
  rationale:"Sequenciamento de sangue que lê os principais genes causadores de doença muscular de uma vez só. Pedido após biópsia sugestiva, ou quando biópsia é impossível e a suspeita é forte. Pode ser feito em paralelo à biópsia para ganhar tempo.",
  interpretation:"<strong>Alteração genética encontrada:</strong> Confirma o diagnóstico e orienta o prognóstico e aconselhamento genético da família. <strong>Normal:</strong> Não exclui doença muscular — o gene causador pode não estar neste painel. Considerar exoma.",
  sus:{nao:true,nota:"Não disponível via SIGTAP. Acesso via autorização judicial ou programas de laboratórios especializados."},
  particular:true,
  associacoes:[{nome:"ASBPR — Doenças Raras Brasil",url:"https://asbpr.org.br",busca:"ASBPR doenças raras Brasil apoio"}],
  condition:(ans,top)=>top.includes(5),
  excludeIf:[]
},
{
  id:"painel_smc",priority:3,
  name:"Painel NGS — Síndromes Miastênicas Congênitas (CHRNE, RAPSN, DOK7, COLQ, AGRN, SCN4A…)",
  covers:[4],
  rationale:"Sequencia os genes da junção neuromuscular quando os anticorpos deram negativo. Essencial porque cada gene alterado responde a um tratamento diferente — por exemplo: casos com alteração no gene DOK7 podem piorar com piridostigmina e precisam de efedrina ou salbutamol.",
  interpretation:"<strong>Alteração encontrada:</strong> Confirma qual tipo de Síndrome Miastênica Congênita o bebê tem e orienta o tratamento correto para aquele gene específico.",
  sus:{nao:true,nota:"Não disponível via SIGTAP. Similar ao painel de miopatias — verificar acesso via serviço de neurologia pediátrica ou genética."},
  particular:true,
  associacoes:[{nome:"ABRAMI — Miastenia Brasil",url:"https://abrami.org.br",busca:"ABRAMI associação brasileira miastenia"}],
  condition:(ans,top)=>top.includes(4),
  excludeIf:[]
},
{
  id:"ube3a",priority:3,
  name:"Sequenciamento do gene UBE3A",
  covers:[2],
  rationale:"Em cerca de 11% dos casos de Angelman, a metilação é normal porque o problema está numa mutação no gene UBE3A — não numa deleção. Pedido quando o quadro clínico é muito característico mas os testes anteriores voltaram normais.",
  interpretation:"<strong>Alteração encontrada no UBE3A:</strong> Diagnóstico de Angelman confirmado por mutação de ponto. <strong>Normal:</strong> Não exclui completamente — existem casos raros por outros mecanismos; discutir com genética.",
  sus:{nao:true,nota:"Não disponível via SIGTAP de rotina. Serviço de genética clínica de referência."},
  particular:true,
  associacoes:[{nome:"ABSA — Angelman Brasil",url:"https://angelmansbrasil.org.br",busca:"ABSA Angelman Brasil associação famílias"}],
  condition:(ans,top)=>top.includes(2),
  excludeIf:[]
},
{
  id:"metilacao14",priority:2,
  name:"Teste de Metilação 14q32 — PADRÃO-OURO para Síndrome de Temple (MS-MLPA 14q32 ou MS-PCR)",
  covers:[10],
  rationale:"A Síndrome de Temple tem três causas possíveis: dissomia uniparental materna do cromossomo 14 (UPD14m, a mais comum), deleção/duplicação em 14q32, ou defeito de imprinting. <strong>O microarray convencional (CGH) não detecta UPD14 — a causa mais comum</strong>. O teste de metilação 14q32 confirma o diagnóstico independente do mecanismo. Indicado quando microarray for normal mas a suspeita clínica de Temple persiste.",
  interpretation:"<strong>Padrão de metilação alterado em 14q32:</strong> Diagnóstico de Síndrome de Temple confirmado — encaminhar à genética para determinar o mecanismo (UPD14, deleção ou epimutação). <strong>Normal:</strong> Afasta Síndrome de Temple na grande maioria dos casos.",
  sus:{parcial:true,nota:"Disponível em centros de referência do SUS com especialização em doenças de imprinting (HC-USP, FIOCRUZ). Solicitar via genética clínica do estado."},
  particular:true,
  associacoes:[{nome:"ASBPR — Doenças Raras Brasil",url:"https://asbpr.org.br",busca:"ASBPR doenças raras Brasil síndrome temple"}],
  condition:(ans,top)=>top.includes(10),
  excludeIf:[]
},
{
  id:"magel2",priority:3,
  name:"Sequenciamento do gene MAGEL2",
  covers:[11],
  rationale:"Mutações de perda de função em MAGEL2 causam condição similar a Prader-Willi mas com artrogripose, hipoventilação neonatal grave e autismo. Microarray pode ser normal (mutações de ponto); metilação 15q normal. Indicado em casos Prader-Willi-like com artrogripose.",
  interpretation:"<strong>Variante patogênica em MAGEL2:</strong> Diagnóstico confirmado. <strong>Normal:</strong> Exclui — reavaliar hipóteses.",
  sus:{nao:true,nota:"Não disponível via SIGTAP. Centros de genética especializada ou autorização judicial."},
  particular:true,
  associacoes:[{nome:"Prader-Willi Brasil",url:"https://praderwilli.org.br",busca:"Prader Willi Brasil MAGEL2 Schaff Yang"}],
  condition:(ans,top)=>top.includes(11)||ans['q_artrog']==='Sim, múltiplas articulações',
  excludeIf:[]
},
{
  id:"exoma",priority:4,
  name:"Sequenciamento de Exoma em Trio (criança + ambos os pais)",
  covers:[0,2,3,4,5,6,7,8,9,10,11],
  rationale:"Sequencia todos os éxons. Rendimento de 30–45% em hipotonia sem diagnóstico após investigação convencional completa. Trio aumenta poder de filtragem e detecção de mutações de novo. Indicado após esgotamento da investigação dirigida.",
  interpretation:"Variante patogênica confirma diagnóstico. Negativo não exclui doença genética — regiões intrônicas, expansões repetições, mosaicismo.",
  sus:{nao:true,nota:"Não disponível via SIGTAP. Pode ser acessado via autorização judicial em casos selecionados. Centros universitários realizam para pesquisa."},
  particular:true,
  associacoes:[
    {nome:"ASBPR — Doenças Raras",url:"https://asbpr.org.br",busca:"ASBPR doenças raras Brasil exoma diagnóstico"},
    {nome:"Vidas Raras",url:"https://vidasraras.org.br",busca:"Vidas Raras Brasil diagnóstico genético"},
  ],
  condition:()=>true,
  excludeIf:[]
},
];

// ════════════════════════════════════════════════════
// ESTADO
// ════════════════════════════════════════════════════

window.HNN_DATA = { SYN, SECTIONS, EXAMS, SYN_DETAILS }
