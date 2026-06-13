// hnn.spwbrasil.org.br — protótipo conceitual
// ATENÇÃO: TODOS os dados aqui são EXEMPLOS FICTÍCIOS. Não use clinicamente.
// Lógica de ranqueamento e dados clínicos adotados a partir do protótipo de
// referência fornecido pelo Marco (matriz de pesos, EXAMS com priority/condition,
// SYN indexado de 0 a 11). Preserva fielmente a estrutura clínica original.

const SYN_DETAILS = {
  0: { sigla:'AME', gene:'SMN1 (5q13)', desc:'Doença do nervos motores por deleção/mutação do SMN1. Fraqueza proximal progressiva, arreflexia, tremores finos contínuos de língua, sem comprometimento cognitivo. Há tratamentos aprovados — diagnóstico precoce é urgente.', chave:['Arreflexia','Fasciculações de língua','Fraqueza proximal','Olhar atento preservado','Sem dismorfias'] },
  1: { sigla:'HC', gene:'multifatorial', desc:'Triado no teste do pezinho. Letargia, icterícia prolongada, macroglossia, mixedema, choro rouco, hipotermia, hipotonia leve a moderada. Tratável e reversível se identificado precocemente.', chave:['Macroglossia','Edema/mixedema','Letargia','Icterícia prolongada'] },
  2: { sigla:'AS', gene:'15q11-q13 (materna) / UBE3A', desc:'Geralmente não se manifesta com hipotonia grave no neonato (manifestações claras aparecem entre 6-12 meses). Pode haver dificuldade alimentar leve. Microcefalia se desenvolve depois.', chave:['Sorriso excessivo','Microcefalia (tardia)','Reflexos normais ou exaltados'] },
  3: { sigla:'DM1', gene:'DMPK (expansão CTG)', desc:'Doença autossômica dominante por expansão CTG em DMPK. Forma congênita grave = sempre transmissão materna (antecipação). O diagnóstico na mãe frequentemente é feito pelo filho. Polidrâmnio, artrogripose e insuficiência respiratória são comuns na forma congênita.', chave:['Mãe com miotonia ou fraqueza','Face miopática','Ptose palpebral bilateral','Polidrâmnio','Artrogripose possível'] },
  4: { sigla:'CMS', gene:'CHRNE, RAPSN, COLQ, DOK7 e outros', desc:'Falha na ligação nervo-músculo por mutação em genes da ligação nervo-músculo. Fraqueza flutuante (fatigabilidade), ptose, oftalmoplegia, frequentemente herança autossômica recessiva.', chave:['Fatigabilidade','Ptose palpebral','Oftalmoplegia','Consanguinidade'] },
  5: { sigla:'MC', gene:'múltiplos (RYR1, NEB, ACTA1, MTM1 …)', desc:'Grupo heterogêneo de miopatias estruturais (nemalínica, central core, centronuclear). Hipotonia grave, fraqueza não-progressiva, reflexos diminuídos ou ausentes, sem tremores finos contínuos.', chave:['Hipotonia grave','Reflexos diminuídos','Insuficiência respiratória','Sem tremores finos contínuos'] },
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
{title:"Gestação e parto",subtitle:"Período antes do nascimento, parto e primeiras horas de vida",icon:"🤰",num:1,questions:[
  {id:"q_movfetal",text:"Como o bebê se mexia dentro da barriga?",hint:"Compare com outras gestações da mãe ou com o esperado para o tempo de gestação.",options:[
    {label:"Mexia normalmente ou bastante",scores:{}},
    {label:"Mexia menos no fim da gestação (3º trimestre)",scores:{0:3,3:2,5:2,11:2}},
    {label:"Quase não mexia",scores:{0:5,3:3,5:3,11:3}},
    {label:"Não observado / não sabe",scores:{}},
  ]},
  {id:"q_polid",text:"Excesso de líquido amniótico durante a gestação?",hint:"Chamado de polidrâmnio. Pode indicar que o bebê tinha dificuldade de engolir dentro da barriga. Geralmente identificado por ultrassom.",options:[
    {label:"Sim",scores:{3:3,0:2,5:2,11:2,4:2}},
    {label:"Não",scores:{}},
    {label:"Não sabe",scores:{}},
  ]},
  {id:"q_artrog",text:"Articulações travadas (contraturas) ao nascer?",hint:"Mãozinhas, pezinhos ou outras articulações que ficam em posição fixa e não se abrem direito. Chamado de artrogripose.",alert:"⚠️ Achado muito importante — ajuda muito a estreitar o diagnóstico.",options:[
    {label:"Sim, múltiplas articulações",scores:{11:7,3:4,5:3}},
    {label:"Sim, leve / poucas articulações",scores:{11:3,3:2,5:2}},
    {label:"Não",scores:{11:-2}},
  ]},
  {id:"q_pezinho",text:"Teste do pezinho — TSH (hormônio da tireoide) estava alterado?",hint:"O teste do pezinho dosa o TSH para triagem do hipotireoidismo congênito.",options:[
    {label:"Sim — TSH elevado / retestagem solicitada",scores:{1:15}},
    {label:"Não — resultado normal",scores:{1:-8}},
    {label:"Não foi feito / resultado desconhecido",scores:{}},
  ]},
  {id:"q_suc",text:"Dificuldade para sugar / engolir nos primeiros dias?",hint:"O bebê precisou de sonda para se alimentar ou tinha muita dificuldade pra mamar?",options:[
    {label:"Sim, grave (precisou de sonda)",scores:{0:3,3:3,5:3,4:3,6:3,11:3,7:2}},
    {label:"Sim, moderada (mama muito devagar e cansa)",scores:{0:2,3:2,5:2,4:2,6:2,11:2}},
    {label:"Não",scores:{}},
  ]},
  {id:"q_choro",text:"Como foi o choro ao nascer?",hint:"Choro fraco ou ausente pode indicar fraqueza dos músculos da respiração ou da laringe.",alert:"⚠️ O choro é um sinal sensível de fraqueza muscular nos primeiros dias.",options:[
    {label:"Normal — vigoroso",scores:{}},
    {label:"Fraco — pouco intenso",scores:{0:3,5:3,3:2,11:2,4:2}},
    {label:"Muito fraco ou quase ausente",scores:{0:5,5:4,3:3,11:3}},
    {label:"Choro rouco / com chiado",scores:{1:3,3:2}},
  ]},
  {id:"q_vm",text:"Precisou de aparelho de respiração (ventilação mecânica)?",options:[
    {label:"Sim",scores:{0:4,11:3,3:3,5:2}},
    {label:"Não",scores:{}},
  ]},
]},
{title:"Família",subtitle:"Saúde dos pais e padrão de herança na família",icon:"👨‍👩‍👧",num:2,questions:[
  {id:"q_mae_miot",text:"A mãe tem dificuldade de relaxar os músculos, fraqueza ou pálpebras caídas?",hint:"Pergunte se ela tem: dificuldade de abrir a mão depois de apertar, fraqueza pra subir escada, pálpebra caída, catarata antes dos 50 anos.",alert:"⚠️ Achado importantíssimo — muda muito as hipóteses, principalmente para doenças transmitidas pela mãe.",options:[
    {label:"Sim — claramente presente",scores:{3:12}},
    {label:"Sim — suspeito / leve",scores:{3:6}},
    {label:"Não",scores:{3:-4}},
    {label:"Não foi avaliado",scores:{}},
  ]},
  {id:"q_consang",text:"Os pais são parentes entre si?",hint:"Quanto mais próximo o parentesco, maior a chance de doenças recessivas (que precisam dos dois genes alterados).",options:[
    {label:"Sim — primos de 1º grau ou mais próximos",scores:{0:3,5:4,4:4}},
    {label:"Sim — parentesco mais distante",scores:{0:2,5:2,4:2}},
    {label:"Não",scores:{}},
  ]},
  {id:"q_famhx",text:"Tem outros familiares com fraqueza muscular ou \"bebê molinho\" como este?",hint:"Padrão na família ajuda no diagnóstico: várias gerações = doença dominante. Só irmãos = doença recessiva. Só pelo lado materno = pode ser ligada ao cromossomo X.",options:[
    {label:"Sim — em várias gerações (avô, pai, etc)",scores:{3:4}},
    {label:"Sim — só em irmãos (mesma família)",scores:{0:3,5:3,4:3}},
    {label:"Sim — só do lado da mãe",scores:{5:2}},
    {label:"Não — caso parece isolado",scores:{2:1,6:1,7:1,8:1,9:1,10:1,11:1}},
  ]},
  {id:"q_obitoneon",text:"Já houve algum irmão (ou bebê próximo na família) que morreu nos primeiros dias sem causa esclarecida?",options:[
    {label:"Sim",scores:{11:3,5:2,0:2}},
    {label:"Não",scores:{}},
  ]},
]},
{title:"Exame neuromuscular",subtitle:"Tônus, força, reflexos e movimentos",icon:"⚡",num:3,questions:[
  {id:"q_refl",text:"Como estão os reflexos quando você bate no joelho / calcanhar (martelinho)?",hint:"Reflexos ausentes ou muito fracos sugerem problema no nervo. Reflexos normais ou aumentados sugerem problema no cérebro.",alert:"⚠️ Um dos achados que mais ajuda a separar as causas de fraqueza muscular.",options:[
    {label:"Ausentes (areflexia)",scores:{0:7,4:2}},
    {label:"Muito diminuídos (hiporreflexia)",scores:{0:3,5:3,3:3,4:3,1:2}},
    {label:"Normais",scores:{2:2,6:2,7:2,8:2,9:2,10:2,11:2}},
    {label:"Aumentados / com abalos rápidos (clônus)",scores:{2:2,9:3}},
  ]},
  {id:"q_fascic",text:"Há tremores finos contínuos na superfície da língua em repouso (\"em minhoquinha\")?",hint:"Conhecido como fasciculação de língua. Peça pra abrir a boca e deixar a língua parada — observe se há movimentos finos. Não conta se o bebê está chorando.",alert:"⚠️ Se presentes, é um sinal muito específico de doença do nervo motor (como a AME).",options:[
    {label:"Sim — claramente visíveis",scores:{0:10}},
    {label:"Duvidoso / possível",scores:{0:4}},
    {label:"Não",scores:{0:-3}},
  ]},
  {id:"q_fraq",text:"Em que parte do corpo a fraqueza é mais notável?",hint:"\"Proximal\" = ombros e quadril (mais perto do tronco). \"Distal\" = mãos e pés. \"Axial\" = pescoço e tronco.",options:[
    {label:"Mais nos ombros e quadril (proximal)",scores:{0:3,5:3,3:2}},
    {label:"Mais nos ombros + algum em mãos/pés (difusa)",scores:{5:2,3:2}},
    {label:"Mais nas mãos e pés (distal)",scores:{3:3}},
    {label:"Pescoço e tronco (axial)",scores:{0:2,6:2,11:2}},
    {label:"Fraqueza espalhada, sem predomínio",scores:{2:2,7:2,8:2,9:2}},
  ]},
  {id:"q_fatig",text:"A fraqueza piora ao longo de uma mamada ou esforço (e melhora ao descansar)?",hint:"O bebê começa a mamar com vigor e progressivamente fica mais fraco; após descansar, retoma o vigor. Chamado de fatigabilidade.",alert:"⚠️ Esse padrão é muito específico para doenças da ligação nervo-músculo (miastenias).",options:[
    {label:"Sim — claramente presente",scores:{4:9}},
    {label:"Sim — possível / suspeito",scores:{4:4}},
    {label:"Não",scores:{4:-3}},
  ]},
  {id:"q_ptose",text:"Pálpebras caídas (\"ptose\")?",options:[
    {label:"Sim, nos dois olhos",scores:{4:5,5:3,3:4}},
    {label:"Sim, só em um olho",scores:{4:3,5:2}},
    {label:"Não",scores:{}},
  ]},
  {id:"q_oftalmo",text:"Limitação dos movimentos dos olhos (\"oftalmoplegia\")?",hint:"O bebê não move os olhos pra todos os lados ao seguir um objeto. Diferente do estrabismo convergente, que é normal nas primeiras semanas.",options:[
    {label:"Sim",scores:{4:4,5:4,3:3}},
    {label:"Não",scores:{}},
  ]},
  {id:"q_miotonia",text:"O músculo demora pra relaxar depois de apertar (\"miotonia\")?",hint:"Ao apertar a mão do bebê (reflexo palmar), ele demora pra abrir de novo. Piora com frio.",alert:"⚠️ Se presente, aponta fortemente para doença transmitida pela mãe.",options:[
    {label:"Sim — presente ao exame",scores:{3:9}},
    {label:"Suspeito / leve",scores:{3:4}},
    {label:"Não",scores:{3:-3}},
  ]},
  {id:"q_atrofia",text:"Os músculos parecem diminuídos / atrofiados?",options:[
    {label:"Sim — bem visível (atrofia marcada)",scores:{0:3,5:3,3:2}},
    {label:"Sim — leve",scores:{0:2,5:2}},
    {label:"Não — músculos com tamanho normal",scores:{2:1,6:1,7:1}},
    {label:"Panturrilhas grandes mas fracas (pseudo-hipertrofia)",scores:{5:3}},
  ]},
]},
{title:"Características físicas",subtitle:"Aparência do bebê ao nascer e nas primeiras semanas",icon:"👁️",num:4,questions:[
  {id:"q_dismorfia",text:"O rosto do bebê tem traços diferentes do esperado (dismorfias)?",hint:"Compare com os pais. Procure por características que fogem do padrão familiar (olhos, boca, queixo, testa).",options:[
    {label:"Sim — marcantes / claramente diferentes",scores:{7:4,9:4,2:3,6:3,8:2,10:2,11:2}},
    {label:"Sim — leves / pouco específicas",scores:{7:2,9:2,6:2,8:1,10:1}},
    {label:"Não — rosto sem alterações",scores:{0:3,4:2}},
  ]},
  {id:"q_face",text:"Qual padrão facial mais parece o do bebê?",hint:"Escolha o que mais lembra a face dele.",options:[
    {label:"Rosto longo, boca aberta em repouso, céu da boca alto",scores:{5:3,3:4}},
    {label:"Rosto arredondado, olhos amendoados, sulco entre nariz e lábio longo",scores:{6:5,11:3}},
    {label:"Lábio superior em forma de M, sulco profundo entre nariz e lábio, boca larga",scores:{7:8}},
    {label:"Sobrancelhas retas e horizontais, olhos fundos",scores:{9:4}},
    {label:"Língua aumentada, moleira muito grande",scores:{1:5}},
    {label:"Maçãs do rosto salientes, queixo proeminente",scores:{8:3}},
    {label:"Nenhum padrão específico identificado",scores:{}},
  ]},
  {id:"q_hipopig",text:"A pele, cabelo ou olhos do bebê são mais claros que os dos pais?",hint:"Compare com o pai e a mãe — a diferença pode ser sutil. Chamado de hipopigmentação relativa.",options:[
    {label:"Sim — claramente mais claro",scores:{6:4,2:4}},
    {label:"Sim — um pouco mais claro",scores:{6:2,2:2}},
    {label:"Não",scores:{}},
  ]},
  {id:"q_acrom",text:"As mãos e pés são desproporcionalmente pequenos pro tamanho do bebê?",hint:"Chamado de acromicria.",options:[
    {label:"Sim — bem marcado",scores:{6:6,10:4}},
    {label:"Sim — no limite",scores:{6:2,10:2}},
    {label:"Não",scores:{}},
  ]},
  {id:"q_hipog",text:"Em meninos: testículos não desceram, escroto pequeno ou pênis pequeno (\"hipogonadismo\"). Em meninas: genital pouco desenvolvido?",options:[
    {label:"Sim",scores:{6:5,11:4,10:4}},
    {label:"Não",scores:{}},
  ]},
  {id:"q_pc",text:"Tamanho da cabeça (perímetro cefálico) ao nascer",options:[
    {label:"Cabeça pequena (microcefalia)",scores:{9:4,2:3}},
    {label:"Normal (entre os percentis 3 e 97)",scores:{}},
    {label:"Cabeça grande (macrocefalia)",scores:{}},
    {label:"Não medido",scores:{}},
  ]},
  {id:"q_sga",text:"Peso e comprimento ao nascer estavam:",hint:"PIG = pequeno para a idade gestacional. AIG = adequado. GIG = grande.",options:[
    {label:"PIG — abaixo do esperado pra idade gestacional",scores:{10:5}},
    {label:"AIG — adequado",scores:{}},
    {label:"GIG — grande pra idade gestacional",scores:{}},
  ]},
  {id:"q_cardio",text:"O bebê tem problema cardíaco identificado (cardiopatia, sopro)?",options:[
    {label:"Sim — confirmado",scores:{9:4,8:2,11:2}},
    {label:"Suspeita / ainda não investigado",scores:{9:2,8:1}},
    {label:"Não",scores:{}},
  ]},
  {id:"q_edema",text:"Rosto inchado, pele pastosa, icterícia que dura muito, prisão de ventre (mixedema)?",options:[
    {label:"Sim — presente",scores:{1:5}},
    {label:"Não",scores:{1:-1}},
  ]},
]},
{title:"Sinais neurológicos",subtitle:"Alerta, resposta a estímulos e respiração",icon:"🧠",num:5,questions:[
  {id:"q_alerta",text:"Como é o nível de alerta e resposta do bebê?",hint:"Ele abre os olhos sozinho? Acompanha rostos? Reage a sons? Tem momentos claramente acordados?",options:[
    {label:"Alerta normal — reativo",scores:{0:2,4:2,5:2}},
    {label:"Um pouco sonolento mas responde a estímulos",scores:{1:2,6:2}},
    {label:"Muito sonolento / difícil de acordar",scores:{6:3,11:3,1:3,7:2}},
    {label:"Quase não responde a estímulos",scores:{11:3,7:3}},
  ]},
  {id:"q_resp",text:"Como o bebê está respirando nos primeiros dias / semanas?",hint:"Observe ele em repouso e durante o sono. Anote qualquer coisa fora do normal.",alert:"⚠️ Bebês com fases de respiração acelerada seguidas de pausas longas têm um padrão muito específico.",options:[
    {label:"Regular e normal",scores:{7:-3}},
    {label:"Respiração acelerada por fraqueza muscular (taquipneia)",scores:{0:3,5:2,11:2}},
    {label:"Pausas na respiração (apneias) sem padrão específico",scores:{0:2,3:2}},
    {label:"Episódios de hiperventilação seguidos de apneia (respiração episódica)",scores:{7:14}},
    {label:"Ruído chiado ao respirar mesmo em repouso (estridor)",scores:{3:2,5:2}},
  ]},
  {id:"q_epil",text:"Apresentou convulsões nos primeiros dias?",hint:"Sinais: olhar desviado, perninhas se mexendo como pedalada, corpo enrijecido, pausa na respiração. Confirmar com EEG (exame elétrico do cérebro).",options:[
    {label:"Sim — convulsões confirmadas",scores:{2:4,9:4,7:3}},
    {label:"Sim — suspeita / ainda investigando",scores:{2:2,9:2,7:1}},
    {label:"Não",scores:{0:2}},
  ]},
  {id:"q_dor",text:"Como o bebê reage à dor (na hora de pegar uma veia, por exemplo)?",hint:"Ele chora e reage com a intensidade esperada?",alert:"⚠️ Bebê que não reage à dor ou reage muito pouco é incomum e bem específico.",options:[
    {label:"Normal — chora e reage como esperado",scores:{8:-1}},
    {label:"Reação diminuída — atenuada",scores:{8:5}},
    {label:"Não reage a procedimentos dolorosos",scores:{8:8}},
    {label:"Não avaliado",scores:{}},
  ]},
  {id:"q_social",text:"Reatividade social — o bebê fixa e segue o rosto de quem cuida dele?",hint:"A partir de 2–4 semanas começa a fixar e seguir rostos. Depois de 6 semanas: sorriso social responsivo.",options:[
    {label:"Normal para a idade",scores:{}},
    {label:"Sorriso excessivo / inadequado — sorri muito",scores:{2:5}},
    {label:"Reduzida — pouco contato visual, pouco responsivo",scores:{7:2,8:3,9:2}},
    {label:"Muito cedo para avaliar (<2 semanas)",scores:{}},
  ]},
  {id:"q_reflexpr",text:"Reflexos do bebê (susto/Moro, preensão da mão, sucção, Babinski) estão:",options:[
    {label:"Presentes e iguais nos dois lados",scores:{}},
    {label:"Diminuídos / incompletos",scores:{0:2,3:2,5:2,6:2}},
    {label:"Ausentes",scores:{0:3,3:3,5:3,11:2}},
    {label:"Diferentes em cada lado (assimétricos)",scores:{}},
  ]},
]},
{title:"Exames já feitos",subtitle:"Informe resultados que já tem em mãos pra ajustar as recomendações",icon:"🔬",num:6,questions:[
  {id:"q_ck",text:"CK (creatina quinase) — resultado:",hint:"Exame de sangue. Indica lesão muscular quando alta.",options:[
    {label:"Não realizada",scores:{}},
    {label:"Normal (até 2x o limite)",scores:{5:-4,3:-1}},
    {label:"Levemente elevada (2 a 5x o limite)",scores:{5:3,3:2,0:1}},
    {label:"Muito elevada (mais de 5x o limite)",scores:{5:6,3:3}},
  ]},
  {id:"q_tsh",text:"TSH + T4 livre — resultado:",hint:"Hormônios da tireoide.",options:[
    {label:"Não realizado",scores:{}},
    {label:"Normal",scores:{1:-6}},
    {label:"TSH alto e T4 baixo",scores:{1:12}},
  ]},
  {id:"q_emg",text:"Eletroneuromiografia (EMG/ENG) — resultado:",hint:"Exame elétrico que avalia nervos e músculos.",options:[
    {label:"Não realizada",scores:{}},
    {label:"Normal",scores:{}},
    {label:"Padrão neuropático (problema no nervo)",scores:{0:7}},
    {label:"Padrão miopático (problema no músculo)",scores:{5:7,3:3}},
    {label:"Queda da resposta quando estimulado repetidas vezes (problema na ligação nervo-músculo)",scores:{4:10}},
    {label:"Descarga miotônica (músculo demora pra relaxar)",scores:{3:8}},
  ]},
  {id:"q_microarray",text:"Microarranjo cromossômico (CMA) — resultado:",hint:"Exame que procura deleções e duplicações no genoma.",options:[
    {label:"Não realizado",scores:{}},
    {label:"Normal (sem deleção/duplicação)",scores:{2:-1,6:-1,7:-1,8:-6,9:-6,10:-1,11:-1}},
    {label:"Alterado — alteração genética encontrada",scores:{2:5,6:5,7:5,8:5,9:5,10:5,11:5}},
  ]},
  // NOTA CLÍNICA IMPORTANTE: microarray normal NÃO afasta Prader-Willi nem Angelman
  {id:"q_smn1",text:"Análise do gene SMN1 (gene da AME) — resultado:",options:[
    {label:"Não realizada",scores:{}},
    {label:"Deleção detectada",scores:{0:20}},
    {label:"Normal — sem deleção",scores:{0:-12}},
  ]},
  {id:"q_metil",text:"Teste de teste de metilação 15q — resultado:",hint:"Exame definitivo para Prader-Willi e Angelman.",options:[
    {label:"Não realizado",scores:{}},
    {label:"Padrão alterado pelo lado da mãe (Prader-Willi)",scores:{6:18}},
    {label:"Padrão alterado pelo lado do pai (Angelman)",scores:{2:18}},
    {label:"Normal — com contribuição dos dois pais",scores:{6:-6,2:-4}},
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
  rationale:"Exame simples e barato que mede uma enzima que aparece no sangue quando o músculo está sendo destruído. Deve ser o primeiro exame pedido em qualquer bebê com hipotonia. Resultado baixo sugere que o problema não está no músculo em si.",
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
  rationale:"O teste do pezinho triou, mas pode ter resultado falso-negativo (resultado dizendo que está normal quando não está) — especialmente nas formas mais leves. O diagnóstico precoce do hipotireoidismo é urgente: o tratamento com levotiroxina (hormônio da tireoide em comprimido), se feito nos primeiros meses, evita sequelas permanentes no desenvolvimento. Exame de baixo custo e alta importância.",
  interpretation:"<strong>TSH alto e T4 baixo:</strong> Hipotireoidismo — iniciar levotiroxina (hormônio da tireoide em comprimido) e encaminhar endocrinologia pediátrica com urgência. <strong>Resultado normal:</strong> Hipotireoidismo afastado como causa principal da hipotonia.",
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
  rationale:"Triagem para excluir doenças metabólicas (mitocondriais (do metabolismo de energia) e de aminoácidos) que podem causar hipotonia. Coletar em repouso, sem choro prolongado ou estresse — o estresse eleva o lactato e pode dar resultado falso.",
  interpretation:"<strong>Lactato alto em repouso:</strong> Suspeita de doença mitocondrial — investigar com ressonância do cérebro com análise química e encaminhar à genética ou neurologia pediátrica. <strong>Normal:</strong> Doença mitocondrial menos provável — mas não totalmente excluída.",
  sus:{sim:true,codigo:"02.02.02.018-9",nome:"DOSAGEM DE LACTATO"},
  particular:true,
  associacoes:[],
  condition:()=>true,
  excludeIf:[]
},
{
  id:"smn1",priority:1,
  name:"Análise molecular SMN1 — MLPA / PCR quantitativa (partes 7 e 8 do gene)",
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
  rationale:"Este é o exame definitivo para Prader-Willi e Angelman — não o microarray. Detecta alterações no padrão de metilação do cromossomo 15, independente da causa (deleção, dissomia uniparental ou falha na marcação do cromossomo). Confirma Prader-Willi em ~99% dos casos e Angelman em ~88%. Deve ser pedido junto ao microarray sempre que há suspeita clínica, sem esperar o resultado do microarray.",
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
  name:"Eletroneuromiografia (EMG + ENG + estímulos repetidos)",
  covers:[0,3,4,5],
  rationale:"Exame elétrico que analisa o funcionamento dos nervos, músculos e da ligação entre nervo e músculo (ligação nervo-músculo). Mostra se o problema está no nervo motor, no músculo ou na transmissão do sinal entre eles. No bebê requer técnica adaptada — solicitar serviço com experiência em neonatos.",
  interpretation:"<strong>Padrão de falta de inervação (neuropático):</strong> Problema no neurônio motor — investigar AME (SMN1). <strong>Padrão miopático:</strong> Problema no músculo — indicar biópsia muscular. <strong>Descargas miotônicas:</strong> Distrofia Miotônica — pedir gene DMPK com urgência. <strong>Decremento na estímulos repetidos:</strong> Problema na ligação nervo-músculo — investigar miastenia.",
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
  rationale:"Sequencia os genes da ligação nervo-músculo quando os anticorpos deram negativo. Essencial porque cada gene alterado responde a um tratamento diferente — por exemplo: casos com alteração no gene DOK7 podem piorar com piridostigmina e precisam de efedrina ou salbutamol.",
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
  rationale:"A Síndrome de Temple tem três causas possíveis: herança dos 2 cromossomos pelo lado da mãe do cromossomo 14 (UPD14m, a mais comum), deleção/duplicação em 14q32, ou falha na marcação do cromossomo. <strong>O microarray convencional (CGH) não detecta UPD14 — a causa mais comum</strong>. O teste de metilação 14q32 confirma o diagnóstico independente do mecanismo. Indicado quando microarray for normal mas a suspeita clínica de Temple persiste.",
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
  interpretation:"<strong>Variante causadoraa de doença em MAGEL2:</strong> Diagnóstico confirmado. <strong>Normal:</strong> Exclui — reavaliar hipóteses.",
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
  interpretation:"Variante causadoraa de doença confirma diagnóstico. Negativo não exclui doença genética — regiões intrônicas, expansões repetições, mosaicismo.",
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
