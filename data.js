// hnn.spwbrasil.org.br — protótipo conceitual
// ATENÇÃO: TODOS os dados aqui são FICTÍCIOS ou aproximações. Não use clinicamente.
// Pesos foram atribuídos por um não-médico tentando refletir literatura, e PRECISAM
// de revisão por geneticista/neurologista antes de qualquer uso real.

window.HNN_DATA = {
  sindromes: [
    { id: 'pws',    nome: 'Prader-Willi', sigla: 'PWS', gene: '15q11-q13 (paterna)', associacao: 'spw_brasil', padraoOuro: 'metilacao_15q' },
    { id: 'sma',    nome: 'AME / SMA tipo 1', sigla: 'AME', gene: 'SMN1 (5q13)', associacao: 'iname', padraoOuro: 'smn1_molecular' },
    { id: 'angel',  nome: 'Síndrome de Angelman', sigla: 'AS', gene: '15q11-q13 (materna) / UBE3A', associacao: 'angelman_brasil', padraoOuro: 'metilacao_15q' },
    { id: 'dm1',    nome: 'Distrofia Miotônica Congênita', sigla: 'DM1', gene: 'DMPK (CTG expansão)', associacao: 'adb', padraoOuro: 'dmpk_molecular' },
    { id: 'cms',    nome: 'Síndromes Miastênicas Congênitas', sigla: 'CMS', gene: 'CHRNE/RAPSN/COLQ e outros', associacao: 'cms_brasil', padraoOuro: 'painel_cms' },
    { id: 'miop',   nome: 'Miopatias Congênitas', sigla: 'MC', gene: 'múltiplos (RYR1, NEB, ACTA1 …)', associacao: 'miopatias_brasil', padraoOuro: 'painel_neuromuscular' },
    { id: 'hipot',  nome: 'Hipotireoidismo Congênito', sigla: 'HC', gene: 'multifatorial', associacao: null, padraoOuro: 'tsh_t4' },
    { id: 'pitth',  nome: 'Síndrome de Pitt-Hopkins', sigla: 'PHS', gene: 'TCF4', associacao: 'pitt_hopkins_brasil', padraoOuro: 'tcf4_sequenciamento' },
    { id: 'phelan', nome: 'Síndrome de Phelan-McDermid', sigla: 'PMS', gene: '22q13.3 / SHANK3', associacao: 'afspm', padraoOuro: 'cma' },
    { id: 'del1p36',nome: 'Deleção 1p36', sigla: '1p36', gene: '1p36', associacao: 'abf1p36', padraoOuro: 'cma' },
    { id: 'temple', nome: 'Síndrome de Temple', sigla: 'TS14', gene: '14q32 (UPD materna)', associacao: null, padraoOuro: 'metilacao_14q32' },
    { id: 'sys',    nome: 'Síndrome de Schaaf-Yang', sigla: 'SYS', gene: 'MAGEL2', associacao: null, padraoOuro: 'magel2_sequenciamento' },
  ],

  // Blocos de perguntas. Cada pergunta tem um id e opções, e cada opção altera o
  // score de uma ou mais síndromes via "deltas" (peso positivo = aumenta suspeita;
  // negativo = reduz). Pesos são EXEMPLOS — precisam revisão clínica.
  blocos: [
    {
      titulo: 'Gestação',
      perguntas: [
        {
          id: 'polidramnio',
          texto: 'Houve polidrâmnio durante a gestação?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { pws: 2, dm1: 3, sys: 2, temple: 1 } },
            { v: 'nao', label: 'Não', deltas: {} },
            { v: 'ns',  label: 'Não sei', deltas: {} },
          ],
        },
        {
          id: 'oligodramnio',
          texto: 'Houve oligodrâmnio?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { miop: 1, cms: 1 } },
            { v: 'nao', label: 'Não', deltas: {} },
            { v: 'ns',  label: 'Não sei', deltas: {} },
          ],
        },
        {
          id: 'movim_fetal',
          texto: 'Movimentação fetal foi:',
          opcoes: [
            { v: 'normal',    label: 'Normal', deltas: {} },
            { v: 'diminuida', label: 'Diminuída', deltas: { pws: 3, dm1: 3, sys: 3, sma: 2, miop: 2, cms: 2, temple: 2 } },
            { v: 'ausente',   label: 'Praticamente ausente', deltas: { sma: 3, dm1: 3, miop: 3, sys: 3 } },
            { v: 'ns',        label: 'Não sei', deltas: {} },
          ],
        },
        {
          id: 'hist_materna_dm',
          texto: 'A mãe tem sinais leves de distrofia miotônica (fraqueza, dificuldade de relaxar mão após contração, catarata precoce)?',
          opcoes: [
            { v: 'sim',     label: 'Sim', deltas: { dm1: 5 } },
            { v: 'nao',     label: 'Não', deltas: { dm1: -2 } },
            { v: 'ns',      label: 'Não investigada', deltas: {} },
          ],
        },
      ],
    },
    {
      titulo: 'Nascimento',
      perguntas: [
        {
          id: 'prematuridade',
          texto: 'Recém-nascido foi prematuro (<37 sem)?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: {} },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
        {
          id: 'peso',
          texto: 'Peso ao nascer:',
          opcoes: [
            { v: 'pig',  label: 'PIG (pequeno para idade gestacional)', deltas: { temple: 3, del1p36: 1 } },
            { v: 'aig',  label: 'AIG (adequado)', deltas: {} },
            { v: 'gig',  label: 'GIG (grande)', deltas: {} },
          ],
        },
        {
          id: 'circ_cefalica',
          texto: 'Circunferência cefálica:',
          opcoes: [
            { v: 'micro',   label: 'Microcefalia', deltas: { del1p36: 3, pitth: 2 } },
            { v: 'normal',  label: 'Normal', deltas: {} },
            { v: 'macro',   label: 'Macrocefalia', deltas: {} },
          ],
        },
        {
          id: 'choro',
          texto: 'Choro do recém-nascido:',
          opcoes: [
            { v: 'forte',  label: 'Forte e vigoroso', deltas: { sma: -1, pws: -1, miop: -1 } },
            { v: 'fraco',  label: 'Fraco', deltas: { pws: 3, sma: 3, dm1: 2, miop: 2, sys: 2, temple: 2 } },
            { v: 'ausente', label: 'Praticamente ausente', deltas: { sma: 3, miop: 3, pws: 2 } },
          ],
        },
      ],
    },
    {
      titulo: 'Sucção e alimentação',
      perguntas: [
        {
          id: 'succao',
          texto: 'Como está a sucção?',
          opcoes: [
            { v: 'normal',   label: 'Normal', deltas: { pws: -2, sys: -2, sma: -1 } },
            { v: 'pobre',    label: 'Pobre / cansa rápido', deltas: { pws: 3, sys: 3, dm1: 2, sma: 2, temple: 2, miop: 2 } },
            { v: 'ausente',  label: 'Ausente, não consegue mamar', deltas: { pws: 4, sys: 4, sma: 2, miop: 2 } },
          ],
        },
        {
          id: 'sonda',
          texto: 'Está usando sonda para alimentação?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { pws: 2, sys: 2, dm1: 2, sma: 2, miop: 2 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
      ],
    },
    {
      titulo: 'Respiração e UTI',
      perguntas: [
        {
          id: 'uti',
          texto: 'Precisou de UTI neonatal?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { dm1: 2, miop: 2, sys: 2, sma: 2 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
        {
          id: 'vent_mecanica',
          texto: 'Precisou de ventilação mecânica?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { dm1: 3, miop: 3, sys: 3, sma: 3, cms: 2 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
        {
          id: 'apneia',
          texto: 'Apresenta episódios de apneia central?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { sys: 3, pitth: 2 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
      ],
    },
    {
      titulo: 'Exame neurológico',
      perguntas: [
        {
          id: 'reflexos',
          texto: 'Reflexos profundos (patelar, aquileu):',
          opcoes: [
            { v: 'preserv',  label: 'Preservados', deltas: { pws: 1, sys: 1, temple: 1, sma: -2 } },
            { v: 'diminuidos', label: 'Diminuídos', deltas: { miop: 2, dm1: 2, cms: 1 } },
            { v: 'ausentes', label: 'Ausentes', deltas: { sma: 4, miop: 2 } },
          ],
        },
        {
          id: 'fasciculacao',
          texto: 'Há fasciculações de língua (movimentos vermiformes da língua em repouso)?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { sma: 5 } },
            { v: 'nao', label: 'Não', deltas: { sma: -2 } },
          ],
        },
        {
          id: 'olhar_atento',
          texto: 'Olhar atento, contato visual preservado mesmo com hipotonia severa?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { sma: 2 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
        {
          id: 'ptose',
          texto: 'Ptose palpebral (pálpebra caída) e/ou oftalmoplegia?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { cms: 4 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
        {
          id: 'flutuante',
          texto: 'A fraqueza muscular é claramente flutuante (varia ao longo do dia)?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { cms: 4 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
      ],
    },
    {
      titulo: 'Dismorfia e outros sinais',
      perguntas: [
        {
          id: 'face_miop',
          texto: 'Face miopática (boca em "tenda", lábios afastados, fraqueza facial bilateral)?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { dm1: 4, miop: 2 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
        {
          id: 'face_pws',
          texto: 'Olhos amendoados, lábio superior fino, fronte estreita?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { pws: 3, sys: 1 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
        {
          id: 'face_pitt',
          texto: 'Nariz proeminente, lábios grossos, queixo proeminente?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { pitth: 3 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
        {
          id: 'face_1p36',
          texto: 'Fronte proeminente, sobrancelhas retas, queixo retraído?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { del1p36: 3 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
        {
          id: 'hipogonad',
          texto: 'Hipogonadismo (criptorquidia / hipoplasia genital)?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { pws: 3, sys: 2 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
        {
          id: 'macroglossia',
          texto: 'Macroglossia (língua aumentada)?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { hipot: 3 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
        {
          id: 'icter',
          texto: 'Icterícia prolongada (>2 semanas) + letargia + hipotermia?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { hipot: 4 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
        {
          id: 'artrog',
          texto: 'Artrogripose (contraturas articulares) ao nascer?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { dm1: 3, sys: 3, miop: 2 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
        {
          id: 'cardiop',
          texto: 'Cardiopatia congênita identificada?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { del1p36: 3 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
        {
          id: 'convulsoes',
          texto: 'Convulsões neonatais?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { del1p36: 2, pitth: 1 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
        {
          id: 'hipogli',
          texto: 'Hipoglicemia recorrente?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { temple: 2 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
      ],
    },
    {
      titulo: 'História familiar',
      perguntas: [
        {
          id: 'consanguin',
          texto: 'Os pais têm grau de parentesco entre si?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { cms: 2, miop: 2 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
        {
          id: 'morte_neon',
          texto: 'Há histórico de morte neonatal de irmãos com causa desconhecida?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { sma: 2, miop: 2, cms: 2 } },
            { v: 'nao', label: 'Não', deltas: {} },
          ],
        },
      ],
    },
    {
      titulo: 'Exames já realizados',
      perguntas: [
        {
          id: 'pezinho_hipot',
          texto: 'Triagem neonatal (teste do pezinho) alterada para hipotireoidismo?',
          opcoes: [
            { v: 'sim',     label: 'Sim', deltas: { hipot: 8 } },
            { v: 'nao',     label: 'Não', deltas: { hipot: -5 } },
            { v: 'pendente',label: 'Resultado ainda pendente', deltas: {} },
          ],
        },
        {
          id: 'tsh',
          texto: 'TSH dosado e está elevado?',
          opcoes: [
            { v: 'sim', label: 'Sim', deltas: { hipot: 6 } },
            { v: 'nao', label: 'Não, TSH normal', deltas: { hipot: -4 } },
            { v: 'ns',  label: 'Não dosado', deltas: {} },
          ],
        },
        {
          id: 'ck',
          texto: 'CK (creatina quinase) dosada:',
          opcoes: [
            { v: 'elevada',  label: 'Elevada', deltas: { dm1: 1, miop: 1 } },
            { v: 'normal',   label: 'Normal', deltas: {} },
            { v: 'ns',       label: 'Não dosada', deltas: {} },
          ],
        },
      ],
    },
  ],

  // Exames padrão-ouro e auxiliares. Pra cada exame: qual síndrome confirma/afasta,
  // disponibilidade SUS, faixa de custo particular, associação que pode ajudar.
  exames: [
    {
      id: 'metilacao_15q',
      nome: 'Teste de Metilação 15q11-q13 (MS-PCR / MLPA)',
      confirma_afasta: ['pws', 'angel'],
      sus: { disponivel: 'centros_referencia', sigtap: '21.02.01.038-7 (FICTÍCIO)', obs: 'Disponível em centros de referência genética; encaminhamento via SUS' },
      particular: { disponivel: true, faixa: '$$' },
      associacao_extra: 'spw_brasil',
      motivo: 'Padrão-ouro para Prader-Willi e Angelman. Resolve duas das principais hipóteses simultaneamente.',
    },
    {
      id: 'smn1_molecular',
      nome: 'Análise molecular SMN1 (MLPA / PCR quantitativa)',
      confirma_afasta: ['sma'],
      sus: { disponivel: 'centros_referencia', sigtap: '21.02.01.024-7 (FICTÍCIO)', obs: 'Disponível em centros de referência; AME tem tratamento de urgência' },
      particular: { disponivel: true, faixa: '$$' },
      associacao_extra: 'iname',
      motivo: 'Padrão-ouro para AME. Exame altamente sensível e específico. URGENTE pelo tempo de início de tratamento.',
    },
    {
      id: 'painel_neuromuscular',
      nome: 'Painel neuromuscular (sequenciamento de múltiplos genes)',
      confirma_afasta: ['miop', 'cms', 'dm1'],
      sus: { disponivel: 'nao', sigtap: '—', obs: 'Não disponível diretamente no SUS' },
      particular: { disponivel: true, faixa: '$$$$' },
      associacao_extra: null,
      motivo: 'Cobre miopatias congênitas, síndromes miastênicas e distrofia miotônica. Bom quando o quadro não é claro.',
    },
    {
      id: 'dmpk_molecular',
      nome: 'Análise molecular DMPK (expansão CTG)',
      confirma_afasta: ['dm1'],
      sus: { disponivel: 'centros_referencia', sigtap: '21.02.01.025-5 (FICTÍCIO)', obs: 'Em centros de referência' },
      particular: { disponivel: true, faixa: '$$' },
      associacao_extra: 'adb',
      motivo: 'Padrão-ouro para distrofia miotônica congênita. Investigar mãe também.',
    },
    {
      id: 'tsh_t4',
      nome: 'TSH + T4 livre',
      confirma_afasta: ['hipot'],
      sus: { disponivel: 'sim', sigtap: '02.02.06.014-5', obs: 'Amplamente disponível em qualquer unidade' },
      particular: { disponivel: true, faixa: '$' },
      associacao_extra: null,
      motivo: 'Exame barato e rápido para confirmar/afastar hipotireoidismo. Deveria ser feito de rotina nesse quadro.',
    },
    {
      id: 'cma',
      nome: 'CMA (microarranjo cromossômico)',
      confirma_afasta: ['phelan', 'del1p36'],
      sus: { disponivel: 'nao', sigtap: '—', obs: 'Não disponível no SUS regularmente' },
      particular: { disponivel: true, faixa: '$$$' },
      associacao_extra: null,
      motivo: 'Detecta deleções e duplicações cromossômicas como 1p36 e 22q13 (Phelan-McDermid).',
    },
    {
      id: 'tcf4_sequenciamento',
      nome: 'Sequenciamento de TCF4',
      confirma_afasta: ['pitth'],
      sus: { disponivel: 'nao', sigtap: '—', obs: 'Restrito a pesquisa / particular' },
      particular: { disponivel: true, faixa: '$$$' },
      associacao_extra: 'pitt_hopkins_brasil',
      motivo: 'Padrão-ouro para Pitt-Hopkins.',
    },
    {
      id: 'metilacao_14q32',
      nome: 'Teste de metilação 14q32',
      confirma_afasta: ['temple'],
      sus: { disponivel: 'nao', sigtap: '—', obs: 'Não disponível pelo SUS' },
      particular: { disponivel: true, faixa: '$$$' },
      associacao_extra: null,
      motivo: 'Identifica disomia uniparental materna 14, padrão-ouro para síndrome de Temple.',
    },
    {
      id: 'magel2_sequenciamento',
      nome: 'Sequenciamento de MAGEL2',
      confirma_afasta: ['sys'],
      sus: { disponivel: 'nao', sigtap: '—', obs: 'Particular / centros de pesquisa' },
      particular: { disponivel: true, faixa: '$$$' },
      associacao_extra: null,
      motivo: 'Padrão-ouro para Schaaf-Yang. Considerar se PWS for negativo mas quadro persistir.',
    },
    {
      id: 'painel_cms',
      nome: 'Painel de Síndromes Miastênicas Congênitas',
      confirma_afasta: ['cms'],
      sus: { disponivel: 'nao', sigtap: '—', obs: 'Particular' },
      particular: { disponivel: true, faixa: '$$$$' },
      associacao_extra: null,
      motivo: 'Sequencia múltiplos genes envolvidos em CMS (CHRNE, RAPSN, COLQ, DOK7).',
    },
  ],

  associacoes: {
    spw_brasil:           { nome: 'SPW Brasil',                    site: 'https://spwbrasil.org.br', oferece: 'Exame gratuito de metilação 15q via parceria com IFF/Fiocruz; orientação e acolhimento.' },
    angelman_brasil:      { nome: 'Angelman Brasil',               site: 'https://angelmanbrasil.org', oferece: 'Subsídio em alguns exames; orientação às famílias.' },
    iname:                { nome: 'INAME (Instituto Nac. AME)',    site: 'https://iname.org.br', oferece: 'Orientação diagnóstica e suporte para acesso ao tratamento.' },
    adb:                  { nome: 'Aliança Distrofia Brasil',      site: 'https://aliancadistrofiabrasil.org.br', oferece: 'Orientação e rede de famílias.' },
    cms_brasil:           { nome: 'Grupo CMS Brasil',              site: '#', oferece: 'Orientação e rede.' },
    miopatias_brasil:     { nome: 'Rede de Miopatias Congênitas',  site: '#', oferece: 'Apoio às famílias.' },
    pitt_hopkins_brasil:  { nome: 'Pitt Hopkins Brasil',           site: 'https://pitthopkinsbrasil.org', oferece: 'Orientação diagnóstica.' },
    afspm:                { nome: 'AFSPM (Phelan-McDermid)',       site: 'https://afspm.com.br', oferece: 'Orientação e suporte.' },
    abf1p36:              { nome: 'Associação Brasileira de Famílias 1p36', site: '#', oferece: 'Orientação e rede.' },
  },
}
