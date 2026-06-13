// hnn.spwbrasil.org.br — lógica do protótipo
// Sem framework, sem persistência, sem servidor. Tudo no client.

(function () {
  const DATA = window.HNN_DATA
  const respostas = {} // { perguntaId: opcaoV }

  // Renderiza blocos de perguntas
  function renderBlocos() {
    const container = document.getElementById('blocos-container')
    container.innerHTML = ''
    for (const bloco of DATA.blocos) {
      const div = document.createElement('div')
      div.className = 'bloco'
      const h = document.createElement('div')
      h.className = 'bloco-titulo'
      h.textContent = bloco.titulo
      div.appendChild(h)

      for (const p of bloco.perguntas) {
        const pDiv = document.createElement('div')
        pDiv.className = 'pergunta'

        const txt = document.createElement('div')
        txt.className = 'pergunta-texto'
        txt.textContent = p.texto
        pDiv.appendChild(txt)

        const ops = document.createElement('div')
        ops.className = 'opcoes'

        for (const opcao of p.opcoes) {
          const btn = document.createElement('button')
          btn.type = 'button'
          btn.className = 'opcao-btn'
          btn.dataset.pergunta = p.id
          btn.dataset.valor = opcao.v
          btn.textContent = opcao.label
          btn.addEventListener('click', () => {
            respostas[p.id] = opcao.v
            // Marca selecionado nessa pergunta
            ops.querySelectorAll('.opcao-btn').forEach(b => b.classList.remove('selected'))
            btn.classList.add('selected')
            atualizar()
          })
          ops.appendChild(btn)
        }
        pDiv.appendChild(ops)
        div.appendChild(pDiv)
      }
      container.appendChild(div)
    }
  }

  // Calcula scores baseado em respostas
  function calcularScores() {
    const scores = {}
    for (const s of DATA.sindromes) scores[s.id] = 0

    for (const bloco of DATA.blocos) {
      for (const p of bloco.perguntas) {
        const r = respostas[p.id]
        if (!r) continue
        const opcao = p.opcoes.find(o => o.v === r)
        if (!opcao || !opcao.deltas) continue
        for (const [sid, delta] of Object.entries(opcao.deltas)) {
          if (sid in scores) scores[sid] += delta
        }
      }
    }
    return scores
  }

  // Normaliza pra %  (compatibilidade relativa, não probabilidade absoluta)
  function normalizar(scores) {
    const valores = Object.values(scores)
    const min = Math.min(...valores, 0)
    // Shift pra ficar sempre >= 0
    const shifted = {}
    for (const [k, v] of Object.entries(scores)) shifted[k] = Math.max(0, v - min)
    const max = Math.max(...Object.values(shifted), 1)
    const pcts = {}
    for (const [k, v] of Object.entries(shifted)) pcts[k] = Math.round((v / max) * 100)
    return pcts
  }

  // Renderiza ranking lateral
  function renderRanking(pcts) {
    const list = document.getElementById('ranking-list')
    list.innerHTML = ''
    const ordenado = DATA.sindromes
      .map(s => ({ ...s, pct: pcts[s.id] || 0 }))
      .sort((a, b) => b.pct - a.pct)

    ordenado.forEach((s, idx) => {
      const li = document.createElement('li')

      const nome = document.createElement('div')
      nome.className = 'ranking-nome'
      nome.textContent = s.sigla
      nome.title = s.nome

      const bar = document.createElement('div')
      bar.className = 'ranking-bar' + (idx < 3 ? ' top' : '')
      const fill = document.createElement('div')
      fill.style.width = s.pct + '%'
      bar.appendChild(fill)

      const pct = document.createElement('div')
      pct.className = 'ranking-pct'
      pct.textContent = s.pct + '%'

      li.appendChild(nome)
      li.appendChild(bar)
      li.appendChild(pct)
      list.appendChild(li)
    })
  }

  // Renderiza ranking de exames priorizando padrão-ouro de síndromes mais prováveis
  function renderExames(pcts) {
    const container = document.getElementById('exames-container')
    container.innerHTML = ''

    const algumaResposta = Object.keys(respostas).length > 0
    if (!algumaResposta) {
      const empty = document.createElement('p')
      empty.className = 'empty'
      empty.textContent = 'Responda algumas perguntas para ver o plano de investigação personalizado.'
      container.appendChild(empty)
      return
    }

    // Score de cada exame: soma dos pcts das síndromes que ele confirma/afasta
    const examesRank = DATA.exames.map(e => {
      const score = e.confirma_afasta.reduce((s, sid) => s + (pcts[sid] || 0), 0)
      const sindromesAlvo = e.confirma_afasta.map(sid => ({
        sid,
        nome: DATA.sindromes.find(s => s.id === sid)?.nome || sid,
        pct: pcts[sid] || 0,
      }))
      return { ...e, score, sindromesAlvo }
    })
    .filter(e => e.score > 0)
    .sort((a, b) => b.score - a.score)

    if (examesRank.length === 0) {
      const empty = document.createElement('p')
      empty.className = 'empty'
      empty.textContent = 'Suspeita ainda baixa — responda mais perguntas pra refinar o plano.'
      container.appendChild(empty)
      return
    }

    examesRank.forEach((e, idx) => {
      const card = document.createElement('div')
      card.className = 'exame-card'

      const header = document.createElement('div')
      header.className = 'exame-header'

      const left = document.createElement('div')
      const ordem = document.createElement('span')
      ordem.className = 'exame-ordem'
      ordem.textContent = 'Exame ' + (idx + 1)
      const titulo = document.createElement('span')
      titulo.className = 'exame-titulo'
      titulo.textContent = ' ' + e.nome
      left.appendChild(ordem)
      left.appendChild(titulo)

      const pri = document.createElement('span')
      pri.className = 'exame-prioridade ' + (idx === 0 ? 'alta' : idx <= 2 ? 'media' : 'baixa')
      pri.textContent = idx === 0 ? 'Alta prioridade' : idx <= 2 ? 'Prioridade média' : 'Considerar depois'

      header.appendChild(left)
      header.appendChild(pri)
      card.appendChild(header)

      const conf = document.createElement('div')
      conf.className = 'exame-confirma'
      const alvos = e.sindromesAlvo
        .map(a => `<strong>${a.nome}</strong> (${a.pct}%)`)
        .join(' · ')
      conf.innerHTML = 'Confirma ou afasta: ' + alvos
      card.appendChild(conf)

      const motivo = document.createElement('div')
      motivo.className = 'exame-motivo'
      motivo.textContent = e.motivo
      card.appendChild(motivo)

      const boxes = document.createElement('div')
      boxes.className = 'exame-boxes'

      // SUS
      const susBox = document.createElement('div')
      susBox.className = 'exame-box sus'
      const susTitleClass = e.sus.disponivel === 'sim' ? '' : e.sus.disponivel === 'nao' ? 'bad' : 'warn'
      const susIcon = e.sus.disponivel === 'sim' ? '✅' : e.sus.disponivel === 'nao' ? '❌' : '⚠️'
      const susLabel = e.sus.disponivel === 'sim' ? 'Disponível no SUS'
        : e.sus.disponivel === 'nao' ? 'Não disponível no SUS'
        : 'Disponível em centros de referência'
      susBox.innerHTML = `
        <div class="exame-box-title ${susTitleClass}">${susIcon} SUS</div>
        <div>${susLabel}</div>
        <small>${e.sus.sigtap !== '—' ? 'SIGTAP ' + e.sus.sigtap : ''}</small>
        <div style="margin-top:4px"><small>${e.sus.obs}</small></div>
      `
      boxes.appendChild(susBox)

      // Particular
      const partBox = document.createElement('div')
      partBox.className = 'exame-box particular'
      const faixaLabel = {
        '$': 'até R$ 300',
        '$$': 'R$ 300 a R$ 1.000',
        '$$$': 'R$ 1.000 a R$ 3.000',
        '$$$$': 'R$ 3.000 a R$ 8.000',
        '$$$$$': 'acima de R$ 8.000',
      }[e.particular.faixa] || ''
      partBox.innerHTML = `
        <div class="exame-box-title">💳 Particular</div>
        <div>${e.particular.disponivel ? '✅ Disponível' : '❌ Indisponível'}</div>
        <div style="margin-top:4px;font-weight:600">${e.particular.faixa} <small>(${faixaLabel})</small></div>
      `
      boxes.appendChild(partBox)

      // Associação
      const assocBox = document.createElement('div')
      assocBox.className = 'exame-box assoc'
      if (e.associacao_extra && DATA.associacoes[e.associacao_extra]) {
        const a = DATA.associacoes[e.associacao_extra]
        assocBox.innerHTML = `
          <div class="exame-box-title">🤝 Associação</div>
          <div><strong>${a.nome}</strong></div>
          <div style="margin-top:4px"><small>${a.oferece}</small></div>
          ${a.site && a.site !== '#' ? `<div style="margin-top:4px"><a href="${a.site}" target="_blank" rel="noopener">${a.site.replace('https://', '')}</a></div>` : ''}
        `
      } else {
        assocBox.innerHTML = `
          <div class="exame-box-title" style="color:var(--gray-500)">🤝 Associação</div>
          <div><small>Sem associação dedicada cadastrada.</small></div>
        `
        assocBox.style.background = 'var(--gray-100)'
        assocBox.style.color = 'var(--gray-500)'
      }
      boxes.appendChild(assocBox)

      card.appendChild(boxes)
      container.appendChild(card)
    })
  }

  // Renderiza síndromes em detalhes (ordenadas por suspeita)
  function renderSindromesExplicadas(pcts) {
    const container = document.getElementById('sindromes-explicadas')
    container.innerHTML = ''
    const ordenado = DATA.sindromes
      .map(s => ({ ...s, pct: pcts[s.id] || 0 }))
      .sort((a, b) => b.pct - a.pct)

    for (const s of ordenado) {
      const det = document.createElement('div')
      det.className = 'sindrome-detalhe'

      const header = document.createElement('div')
      header.className = 'sindrome-header'

      const left = document.createElement('div')
      const t = document.createElement('div')
      t.className = 'sindrome-titulo'
      t.textContent = s.nome
      const g = document.createElement('div')
      g.className = 'sindrome-gene'
      g.textContent = s.gene
      left.appendChild(t)
      left.appendChild(g)

      const p = document.createElement('div')
      p.className = 'sindrome-pct'
      p.textContent = s.pct + '%'

      header.appendChild(left)
      header.appendChild(p)
      det.appendChild(header)

      // Padrão-ouro
      const ouro = DATA.exames.find(e => e.id === s.padraoOuro)
      if (ouro) {
        const padr = document.createElement('div')
        padr.style.fontSize = '12px'
        padr.style.color = 'var(--gray-700)'
        padr.style.marginTop = '6px'
        padr.innerHTML = `<strong>Padrão-ouro:</strong> ${ouro.nome}`
        det.appendChild(padr)
      }

      if (s.associacao && DATA.associacoes[s.associacao]) {
        const a = DATA.associacoes[s.associacao]
        const assoc = document.createElement('div')
        assoc.style.fontSize = '12px'
        assoc.style.color = 'var(--gray-700)'
        assoc.style.marginTop = '4px'
        assoc.innerHTML = `<strong>Associação:</strong> ${a.nome}${a.site && a.site !== '#' ? ' — <a href="' + a.site + '" target="_blank" rel="noopener">' + a.site.replace('https://', '') + '</a>' : ''}`
        det.appendChild(assoc)
      }

      container.appendChild(det)
    }
  }

  function atualizar() {
    const scores = calcularScores()
    const pcts = normalizar(scores)
    renderRanking(pcts)
    renderExames(pcts)
    renderSindromesExplicadas(pcts)
  }

  function reset() {
    for (const k of Object.keys(respostas)) delete respostas[k]
    document.querySelectorAll('.opcao-btn.selected').forEach(b => b.classList.remove('selected'))
    atualizar()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Init
  document.addEventListener('DOMContentLoaded', () => {
    renderBlocos()
    atualizar()
    document.getElementById('reset-btn').addEventListener('click', reset)
    const banner = document.getElementById('disclaimer-banner')
    document.getElementById('disclaimer-close').addEventListener('click', () => {
      banner.classList.toggle('collapsed')
    })
  })
})()
