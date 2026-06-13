// hnn.spwbrasil.org.br
(function () {
  const DATA = window.HNN_DATA
  const respostas = {}

  function totalPerguntas() {
    return DATA.blocos.reduce((s, b) => s + b.perguntas.length, 0)
  }
  function totalRespondidas() {
    return Object.keys(respostas).length
  }
  function todasRespondidas() {
    return totalRespondidas() >= totalPerguntas()
  }

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

        if (p.hint) {
          const hint = document.createElement('div')
          hint.className = 'pergunta-hint'
          hint.textContent = p.hint
          pDiv.appendChild(hint)
        }

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

  function normalizar(scores) {
    const valores = Object.values(scores)
    const min = Math.min(...valores, 0)
    const shifted = {}
    for (const [k, v] of Object.entries(scores)) shifted[k] = Math.max(0, v - min)
    const max = Math.max(...Object.values(shifted), 1)
    const pcts = {}
    for (const [k, v] of Object.entries(shifted)) pcts[k] = Math.round((v / max) * 100)
    return pcts
  }

  function classeSuspeita(pct) {
    if (pct >= 70) return { className: 'alta', dot: '🔴', label: 'Alta suspeita' }
    if (pct >= 40) return { className: 'moderada', dot: '🟡', label: 'Suspeita moderada' }
    return { className: 'baixa', dot: '⚪', label: 'Suspeita baixa' }
  }
  function classeLinha(idx) {
    if (idx === 0) return { dot: '🔴', label: '1ª Linha' }
    if (idx === 1) return { dot: '🟠', label: '2ª Linha' }
    if (idx === 2) return { dot: '🟡', label: '3ª Linha' }
    return { dot: '⚪', label: 'Considerar' }
  }

  function renderProgresso() {
    const el = document.getElementById('progresso-pill')
    const done = totalRespondidas()
    const tot = totalPerguntas()
    el.textContent = `${done}/${tot} respondidas`
    el.classList.toggle('completo', done >= tot)
  }

  function renderRanking(pcts) {
    const list = document.getElementById('ranking-list')
    list.innerHTML = ''

    if (!todasRespondidas()) {
      const div = document.createElement('div')
      div.className = 'ranking-bloqueado'
      const tot = totalPerguntas()
      const done = totalRespondidas()
      div.innerHTML = `
        <div class="ranking-bloqueado-icon">🔒</div>
        <div class="ranking-bloqueado-title">Ranking liberado ao final</div>
        <div class="ranking-bloqueado-text">Responda todas as ${tot} perguntas pra ver a suspeita diagnóstica.</div>
        <div class="ranking-bloqueado-progresso">
          <div class="ranking-bloqueado-bar"><div style="width:${(done/tot*100).toFixed(0)}%"></div></div>
          <div class="ranking-bloqueado-counter">${done} de ${tot}</div>
        </div>
      `
      list.appendChild(div)
      return
    }

    const ordenado = DATA.sindromes
      .map(s => ({ ...s, pct: pcts[s.id] || 0 }))
      .sort((a, b) => b.pct - a.pct)

    const ul = document.createElement('ul')
    ul.className = 'ranking-list'
    ordenado.forEach((s) => {
      const li = document.createElement('li')
      li.innerHTML = `
        <div class="ranking-row-top">
          <span class="ranking-nome" title="${s.nome}">${s.nome}</span>
          <span class="ranking-pct">${s.pct}</span>
        </div>
        <div class="ranking-bar"><div style="width:${s.pct}%;background:${s.cor}"></div></div>
      `
      ul.appendChild(li)
    })
    list.appendChild(ul)
    const hint = document.createElement('p')
    hint.className = 'ranking-hint'
    hint.textContent = 'Ranking baseado nos achados clínicos informados. Compatibilidade relativa — não probabilidade absoluta.'
    list.appendChild(hint)
  }

  function renderExames(pcts) {
    const container = document.getElementById('exames-container')
    container.innerHTML = ''

    if (!todasRespondidas()) {
      container.innerHTML = `<div class="empty">
        Responda todas as perguntas pra ver o plano personalizado de investigação.
      </div>`
      return
    }

    const examesRank = DATA.exames.map(e => {
      const score = e.confirma_afasta.reduce((s, sid) => s + (pcts[sid] || 0), 0)
      const sindromesAlvo = e.confirma_afasta.map(sid => {
        const s = DATA.sindromes.find(x => x.id === sid)
        return { sid, nome: s.nome, pct: pcts[sid] || 0, cor: s.cor }
      })
      return { ...e, score, sindromesAlvo }
    })
    .filter(e => e.score > 0)
    .sort((a, b) => b.score - a.score)

    if (examesRank.length === 0) {
      container.innerHTML = '<div class="empty">Suspeita ainda baixa para todos os exames.</div>'
      return
    }

    examesRank.forEach((e, idx) => {
      const linha = classeLinha(idx)
      const card = document.createElement('div')
      card.className = 'exame-card'
      card.style.borderLeftColor = e.sindromesAlvo[0]?.cor || '#2F51A2'

      // header badge
      const badge = `<div class="exame-badge">${linha.dot} ${linha.label} · Exame ${idx + 1}</div>`
      // título e padrão-ouro tag
      const tituloHtml = `
        <h3 class="exame-titulo">${e.nome}${e.padrao_ouro ? ' <span class="exame-tag-ouro">PADRÃO-OURO</span>' : ''}</h3>
      `
      // "Avalia / afasta / confirma" pílulas
      const pills = e.sindromesAlvo.map(a =>
        `<span class="exame-pill" style="background:${a.cor}22;color:${a.cor};border-color:${a.cor}55">${a.nome}</span>`
      ).join('')

      const descricao = `<p class="exame-descricao">${e.descricao}</p>`

      // 3 boxes
      const susIcon = e.sus.disponivel === 'sim' ? '✅' : e.sus.disponivel === 'parcial' ? '⚠️' : '❌'
      const susTitle = e.sus.disponivel === 'sim' ? 'SUS — Disponível' : e.sus.disponivel === 'parcial' ? 'SUS — Acesso parcial' : 'SUS — Indisponível'
      const susBox = `
        <div class="exame-box sus">
          <div class="exame-box-title">${susIcon} ${susTitle}</div>
          <div class="exame-box-body">${e.sus.obs}</div>
          ${e.sus.sigtap !== '—' ? `<div class="exame-box-tag">SIGTAP ${e.sus.sigtap}</div>` : ''}
        </div>
      `
      const partBox = `
        <div class="exame-box particular">
          <div class="exame-box-title">💳 Rede Particular</div>
          <div class="exame-box-body">${e.particular.disponivel ? '✅ Disponível em laboratórios da rede privada. Solicitar com pedido médico.' : '❌ Indisponível.'}</div>
          <div class="exame-box-faixa"><span class="exame-faixa-cifras">${e.particular.faixa}</span> <small>≈ ${e.particular.faixaTexto || ''}</small></div>
        </div>
      `
      let assocBox
      const a1 = e.associacao_extra && DATA.associacoes[e.associacao_extra]
      const a2 = e.associacao_extra2 && DATA.associacoes[e.associacao_extra2]
      if (a1 || a2) {
        const blocks = [a1, a2].filter(Boolean).map(a => `
          <div class="assoc-block">
            <div class="assoc-nome">✅ ${a.nome}</div>
            <div class="assoc-oferece">${a.oferece}</div>
            ${a.site && a.site !== '#' ? `<div class="assoc-link">🌐 <a href="${a.site}" target="_blank" rel="noopener">${a.site.replace(/^https?:\/\//, '')}</a></div>` : ''}
          </div>
        `).join('')
        assocBox = `<div class="exame-box assoc">
          <div class="exame-box-title">🤝 Associações de Pacientes</div>
          ${blocks}
        </div>`
      } else {
        assocBox = `<div class="exame-box assoc vazia">
          <div class="exame-box-title">🤝 Associações de Pacientes</div>
          <div class="exame-box-body">Sem associação dedicada cadastrada para este exame.</div>
        </div>`
      }

      // Como interpretar
      const interp = e.interpretacao ? `
        <div class="exame-interpretar">
          <strong>📋 Como interpretar:</strong> ${e.interpretacao}
        </div>
      ` : ''

      card.innerHTML = `
        ${badge}
        ${tituloHtml}
        <div class="exame-confirma-label">Avalia / afasta / confirma:</div>
        <div class="exame-pills">${pills}</div>
        ${descricao}
        <div class="exame-boxes">
          ${susBox}
          ${partBox}
          ${assocBox}
        </div>
        ${interp}
      `
      container.appendChild(card)
    })
  }

  function renderSindromesExplicadas(pcts) {
    const container = document.getElementById('sindromes-explicadas')
    container.innerHTML = ''

    if (!todasRespondidas()) {
      container.innerHTML = `<div class="empty">Responda todas as perguntas pra ver o detalhamento.</div>`
      return
    }

    const ordenado = DATA.sindromes
      .map(s => ({ ...s, pct: pcts[s.id] || 0 }))
      .sort((a, b) => b.pct - a.pct)

    ordenado.forEach((s, idx) => {
      const susp = classeSuspeita(s.pct)
      const card = document.createElement('div')
      card.className = 'sindrome-card'
      card.style.borderLeftColor = s.cor

      const pills = (s.sintomasChave || []).map(t =>
        `<span class="sint-pill" style="background:${s.cor}15;color:${s.cor}">${t}</span>`
      ).join('')

      card.innerHTML = `
        <div class="sindrome-num" style="background:${s.cor}">${idx + 1}º</div>
        <div class="sindrome-body">
          <div class="sindrome-top">
            <div>
              <h3 class="sindrome-nome" style="color:${s.cor}">${s.nome}</h3>
              <div class="sindrome-suspeita ${susp.className}">${susp.dot} ${susp.label}</div>
            </div>
            <div class="sindrome-gene-box">${s.gene}</div>
          </div>
          <p class="sindrome-desc">${s.descricao}</p>
          <div class="sint-pills">${pills}</div>
          <div class="sindrome-bar"><div style="width:${s.pct}%;background:${s.cor}"></div></div>
          <div class="sindrome-bar-label">Compatibilidade relativa: <strong>${s.pct}%</strong></div>
        </div>
      `
      container.appendChild(card)
    })
  }

  function atualizar() {
    const scores = calcularScores()
    const pcts = normalizar(scores)
    renderProgresso()
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
