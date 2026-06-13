// hnn.spwbrasil.org.br
// Adota integralmente a lógica de ranqueamento do protótipo de referência:
// scores indexados, sort de exames por priority + primaryScore + coverCount,
// condition() e excludeIf por exame. Visual e estrutura de página preservados.

(function () {
  const D = window.HNN_DATA
  const SYN = D.SYN
  const SECTIONS = D.SECTIONS
  const EXAMS = D.EXAMS
  const DET = D.SYN_DETAILS

  const answers = {}
  const scores = new Array(SYN.length).fill(0)
  let curSec = 0   // índice da seção atual (paginação por bloco)
  let resultadoAberto = false  // só vira true ao clicar "Ver resultado" no fim

  // Padrão-ouro de cada exame (qual síndrome ele é definitivo) — mesma tabela do ref
  const PRIMARY_FOR = {
    smn1:[0], tsh:[1], ube3a:[2], metilacao:[2,6],
    dmpk:[3], anticorpos:[4], painel_smc:[4],
    biopsia:[5], painel_miop:[5],
    tcf4:[7], metilacao14:[10], magel2:[11],
  }

  function totalPerguntas() {
    return SECTIONS.reduce((s, sec) => s + sec.questions.length, 0)
  }
  function totalRespondidas() {
    return Object.keys(answers).length
  }
  function todasRespondidas() {
    return totalRespondidas() >= totalPerguntas()
  }

  function pick(q, opcao) {
    if (answers[q.id]) {
      const prev = q.options.find(o => o.label === answers[q.id])
      if (prev && prev.scores) {
        Object.entries(prev.scores).forEach(([i, v]) => { scores[+i] -= v })
      }
    }
    answers[q.id] = opcao.label
    if (opcao.scores) {
      Object.entries(opcao.scores).forEach(([i, v]) => { scores[+i] += v })
    }
  }

  function renderBlocos() {
    const container = document.getElementById('blocos-container')
    container.innerHTML = ''

    const sec = SECTIONS[curSec]
    const isLast = curSec === SECTIONS.length - 1

    // Stepper visual (compactinho com o nº da seção atual)
    const stepper = document.createElement('div')
    stepper.className = 'stepper'
    SECTIONS.forEach((s, idx) => {
      const dot = document.createElement('div')
      const sectionDone = s.questions.every(q => answers[q.id])
      dot.className = 'stepper-dot' + (idx === curSec ? ' active' : '') + (sectionDone ? ' done' : '')
      dot.title = s.title
      dot.textContent = idx + 1
      dot.addEventListener('click', () => { curSec = idx; renderBlocos() })
      stepper.appendChild(dot)
    })
    container.appendChild(stepper)

    const div = document.createElement('div')
    div.className = 'bloco bloco-paginado'
    const h = document.createElement('div')
    h.className = 'bloco-titulo'
    h.textContent = `${sec.icon} Seção ${sec.num} de ${SECTIONS.length}: ${sec.title}`
    div.appendChild(h)
    const subt = document.createElement('div')
    subt.className = 'bloco-sub'
    subt.textContent = sec.subtitle
    div.appendChild(subt)

    for (const q of sec.questions) {
      const pDiv = document.createElement('div')
      pDiv.className = 'pergunta'

      const txt = document.createElement('div')
      txt.className = 'pergunta-texto'
      txt.textContent = q.text
      pDiv.appendChild(txt)

      if (q.hint) {
        const hint = document.createElement('div')
        hint.className = 'pergunta-hint'
        hint.innerHTML = '💡 ' + escapeHtml(q.hint)
        pDiv.appendChild(hint)
      }
      if (q.alert) {
        const al = document.createElement('div')
        al.className = 'pergunta-alert'
        al.textContent = q.alert
        pDiv.appendChild(al)
      }

      const ops = document.createElement('div')
      ops.className = 'opcoes'
      for (const opcao of q.options) {
        const btn = document.createElement('button')
        btn.type = 'button'
        btn.className = 'opcao-btn'
        if (answers[q.id] === opcao.label) btn.classList.add('selected')
        btn.textContent = opcao.label
        btn.addEventListener('click', () => {
          pick(q, opcao)
          ops.querySelectorAll('.opcao-btn').forEach(b => b.classList.remove('selected'))
          btn.classList.add('selected')
          atualizarStepperEProgresso()
        })
        ops.appendChild(btn)
      }
      pDiv.appendChild(ops)
      div.appendChild(pDiv)
    }
    container.appendChild(div)

    // Nav botões
    const nav = document.createElement('div')
    nav.className = 'paginacao-nav'
    if (curSec > 0) {
      const back = document.createElement('button')
      back.type = 'button'
      back.className = 'nav-btn nav-back'
      back.textContent = '← Seção anterior'
      back.onclick = () => { curSec--; renderBlocos(); scrollTopo() }
      nav.appendChild(back)
    }
    const info = document.createElement('div')
    info.className = 'paginacao-info'
    const respondidasSec = sec.questions.filter(q => answers[q.id]).length
    info.textContent = `${respondidasSec} / ${sec.questions.length} respondidas nesta seção`
    nav.appendChild(info)

    const next = document.createElement('button')
    next.type = 'button'
    next.className = 'nav-btn nav-next' + (isLast ? ' nav-finish' : '')
    if (isLast) {
      next.textContent = todasRespondidas() ? '🔓 Ver resultado →' : `Responda todas para liberar (${totalRespondidas()}/${totalPerguntas()})`
      next.disabled = !todasRespondidas()
      next.onclick = () => { resultadoAberto = true; atualizar(); scrollResultados() }
    } else {
      next.textContent = 'Próxima seção →'
      next.onclick = () => { curSec++; renderBlocos(); scrollTopo() }
    }
    nav.appendChild(next)
    container.appendChild(nav)
  }

  function atualizarStepperEProgresso() {
    // Re-render só dos elementos que mudam quando uma resposta é clicada,
    // mantendo a página estável (não pula scroll).
    renderProgresso()
    // Atualiza dots do stepper
    const dots = document.querySelectorAll('.stepper-dot')
    SECTIONS.forEach((s, idx) => {
      const done = s.questions.every(q => answers[q.id])
      dots[idx]?.classList.toggle('done', done)
    })
    // Atualiza counter da seção atual
    const sec = SECTIONS[curSec]
    const respondidasSec = sec.questions.filter(q => answers[q.id]).length
    const info = document.querySelector('.paginacao-info')
    if (info) info.textContent = `${respondidasSec} / ${sec.questions.length} respondidas nesta seção`
    // Reabilita botão final
    if (curSec === SECTIONS.length - 1) {
      const next = document.querySelector('.nav-finish')
      if (next) {
        next.textContent = todasRespondidas() ? '🔓 Ver resultado →' : `Responda todas para liberar (${totalRespondidas()}/${totalPerguntas()})`
        next.disabled = !todasRespondidas()
      }
    }
    // Se resultado já está aberto, recalcula
    if (resultadoAberto) {
      renderRanking()
      renderExames()
      renderSindromesExplicadas()
    }
  }

  function scrollTopo() {
    document.getElementById('questionario-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  function scrollResultados() {
    setTimeout(() => {
      document.getElementById('exames-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  function rankedSynd() {
    return scores
      .map((s, i) => ({ i, s, syn: SYN[i], det: DET[i] || {} }))
      .sort((a, b) => b.s - a.s)
  }

  function renderProgresso() {
    const el = document.getElementById('progresso-pill')
    const done = totalRespondidas()
    const tot = totalPerguntas()
    el.textContent = `${done}/${tot} respondidas`
    el.classList.toggle('completo', done >= tot)
  }

  function renderRanking() {
    const list = document.getElementById('ranking-list')
    list.innerHTML = ''

    if (!todasRespondidas() || !resultadoAberto) {
      const done = totalRespondidas()
      const tot = totalPerguntas()
      const pct = (done / tot) * 100
      list.innerHTML = `
        <div class="ranking-bloqueado">
          <div class="ranking-bloqueado-icon">🔒</div>
          <div class="ranking-bloqueado-title">Ranking liberado ao final</div>
          <div class="ranking-bloqueado-text">Responda todas as ${tot} perguntas para ver a suspeita diagnóstica.</div>
          <div class="ranking-bloqueado-bar"><div style="width:${pct.toFixed(0)}%"></div></div>
          <div class="ranking-bloqueado-counter">${done} de ${tot}</div>
        </div>`
      return
    }

    const ranked = rankedSynd()
    const maxS = Math.max(1, ranked[0].s)

    const ul = document.createElement('ul')
    ul.className = 'ranking-list'
    ranked.forEach((r) => {
      const w = Math.max(0, (r.s / maxS) * 100)
      const li = document.createElement('li')
      li.innerHTML = `
        <div class="ranking-row-top">
          <span class="ranking-nome" title="${escapeHtml(r.syn.name)}">${escapeHtml(r.syn.name)}</span>
          <span class="ranking-pct">${r.s}</span>
        </div>
        <div class="ranking-bar"><div style="width:${w}%;background:${r.syn.color}"></div></div>
      `
      ul.appendChild(li)
    })
    list.appendChild(ul)

    const hint = document.createElement('p')
    hint.className = 'ranking-hint'
    hint.textContent = 'Ranking baseado nos achados clínicos informados.'
    list.appendChild(hint)
  }

  function renderExames() {
    const container = document.getElementById('exames-container')
    container.innerHTML = ''

    if (!todasRespondidas() || !resultadoAberto) {
      container.innerHTML = `<div class="empty">Termine o questionário e clique em "Ver resultado" pra liberar o plano personalizado.</div>`
      return
    }

    const ranked = rankedSynd()
    const topIdx = ranked.slice(0, 5).map(r => r.i)

    // Already done? Para cada perguntaId em excludeIf, se respondida com algo
    // diferente de "Não realizada" / "Não realizado", marca como done.
    const done = {}
    SECTIONS.forEach(sec => sec.questions.forEach(q => {
      if (answers[q.id] && !/^Não realizad[ao]/i.test(answers[q.id])) done[q.id] = true
    }))

    function primaryScore(e) {
      const pf = PRIMARY_FOR[e.id] || []
      for (let r = 0; r < ranked.length; r++) {
        if (pf.includes(ranked[r].i)) return r
      }
      return 999
    }
    function coverCount(e) { return (e.covers || []).filter(i => topIdx.includes(i)).length }

    const aplicaveis = EXAMS.filter(e => {
      try {
        const cond = e.condition ? e.condition(answers, topIdx) : true
        const notDone = !(e.excludeIf || []).some(k => done[k])
        return cond && notDone
      } catch { return false }
    }).sort((a, b) => {
      if (a.priority !== b.priority) return a.priority - b.priority
      const pa = primaryScore(a), pb = primaryScore(b)
      if (pa !== pb) return pa - pb
      return coverCount(b) - coverCount(a)
    })

    if (aplicaveis.length === 0) {
      container.innerHTML = `<div class="empty">Nenhum exame ainda recomendado com base nas respostas.</div>`
      return
    }

    const priorityColor = ['', '#c0392b', '#d68910', '#2e6da4', '#6c3483']
    const priorityLabel = ['', '🔴 1ª Linha', '🟡 2ª Linha', '🔵 3ª Linha', '🟣 4ª Linha']

    aplicaveis.forEach((e, idx) => {
      const c = priorityColor[e.priority] || '#2F51A2'
      const card = document.createElement('div')
      card.className = 'exame-card'
      card.style.borderLeftColor = c

      const covers = (e.covers || []).map(i => SYN[i])
      const pillsHtml = covers.map(s =>
        `<span class="exame-pill" style="background:${s.bg};color:${s.color};border-color:${s.color}55">${escapeHtml(s.name)}</span>`
      ).join('')

      const padraoOuro = (PRIMARY_FOR[e.id] || []).length > 0

      // SUS box
      let susHtml
      if (e.sus.sim) {
        susHtml = `
          <div class="exame-box sus">
            <div class="exame-box-title">✅ SUS — Disponível</div>
            <div class="exame-box-body">${escapeHtml(e.sus.nome || 'Disponível em laboratórios SUS')}</div>
            ${e.sus.codigo ? `<div class="exame-box-tag">SIGTAP ${e.sus.codigo}</div>` : ''}
          </div>`
      } else if (e.sus.parcial) {
        susHtml = `
          <div class="exame-box sus warn">
            <div class="exame-box-title">⚠️ SUS — Acesso parcial</div>
            <div class="exame-box-body">${e.sus.nota || ''}</div>
            ${e.sus.codigo ? `<div class="exame-box-tag">SIGTAP ${e.sus.codigo}</div>` : ''}
          </div>`
      } else {
        susHtml = `
          <div class="exame-box sus bad">
            <div class="exame-box-title">❌ SUS — Indisponível</div>
            <div class="exame-box-body">${e.sus.nota || 'Não disponível via SIGTAP de rotina.'}</div>
          </div>`
      }

      const partHtml = `
        <div class="exame-box particular">
          <div class="exame-box-title">💳 Rede Particular</div>
          <div class="exame-box-body">${e.particular ? '✅ Disponível em laboratórios da rede privada. Solicitar com pedido médico.' : '❌ Indisponível.'}</div>
        </div>`

      let assocHtml
      if (e.associacoes && e.associacoes.length) {
        const blocks = e.associacoes.map(a => `
          <div class="assoc-block">
            <div class="assoc-nome">✅ ${escapeHtml(a.nome)}</div>
            ${a.url && a.url !== '#' ? `<div class="assoc-link">🌐 <a href="${a.url}" target="_blank" rel="noopener">${escapeHtml(a.url.replace(/^https?:\/\//, ''))}</a></div>` : ''}
          </div>
        `).join('')
        assocHtml = `<div class="exame-box assoc">
          <div class="exame-box-title">🤝 Associações de Pacientes</div>
          ${blocks}
        </div>`
      } else {
        assocHtml = `<div class="exame-box assoc vazia">
          <div class="exame-box-title">🤝 Associações de Pacientes</div>
          <div class="exame-box-body">Sem associação dedicada cadastrada para este exame.</div>
        </div>`
      }

      card.innerHTML = `
        <div class="exame-badge" style="color:${c};border-color:${c}55">${priorityLabel[e.priority] || ''} · Exame ${idx + 1}</div>
        <h3 class="exame-titulo">
          ${escapeHtml(e.name)}
          ${padraoOuro ? '<span class="exame-tag-ouro">PADRÃO-OURO</span>' : ''}
        </h3>
        <div class="exame-confirma-label">Avalia / afasta / confirma:</div>
        <div class="exame-pills">${pillsHtml || '<span class="muted">—</span>'}</div>
        <p class="exame-descricao">${e.rationale}</p>
        <div class="exame-boxes">
          ${susHtml}
          ${partHtml}
          ${assocHtml}
        </div>
        ${e.interpretation ? `<div class="exame-interpretar"><strong>📋 Como interpretar:</strong> ${e.interpretation}</div>` : ''}
      `
      container.appendChild(card)
    })
  }

  function renderSindromesExplicadas() {
    const container = document.getElementById('sindromes-explicadas')
    container.innerHTML = ''

    if (!todasRespondidas() || !resultadoAberto) {
      container.innerHTML = `<div class="empty">Termine o questionário e clique em "Ver resultado" pra liberar o detalhamento.</div>`
      return
    }

    const ranked = rankedSynd()
    const maxS = Math.max(1, ranked[0].s)

    ranked.forEach((r, idx) => {
      const pct = Math.round((r.s / maxS) * 100)
      const susp = classeSuspeita(pct)
      const card = document.createElement('div')
      card.className = 'sindrome-card'
      card.style.borderLeftColor = r.syn.color

      const pills = (r.det.chave || []).map(t =>
        `<span class="sint-pill" style="background:${r.syn.bg};color:${r.syn.color}">${escapeHtml(t)}</span>`
      ).join('')

      card.innerHTML = `
        <div class="sindrome-num" style="background:${r.syn.color}">${idx + 1}º</div>
        <div class="sindrome-body">
          <div class="sindrome-top">
            <div>
              <h3 class="sindrome-nome" style="color:${r.syn.color}">${escapeHtml(r.syn.name)}</h3>
              <div class="sindrome-suspeita ${susp.className}">${susp.dot} ${susp.label}</div>
            </div>
            <div class="sindrome-gene-box">${escapeHtml(r.det.gene || '')}</div>
          </div>
          <p class="sindrome-desc">${escapeHtml(r.det.desc || '')}</p>
          <div class="sint-pills">${pills}</div>
          <div class="sindrome-bar"><div style="width:${pct}%;background:${r.syn.color}"></div></div>
          <div class="sindrome-bar-label">Compatibilidade relativa: <strong>${pct}%</strong> · score ${r.s}</div>
        </div>
      `
      container.appendChild(card)
    })
  }

  function classeSuspeita(pct) {
    if (pct >= 70) return { className: 'alta', dot: '🔴', label: 'Alta suspeita' }
    if (pct >= 40) return { className: 'moderada', dot: '🟡', label: 'Suspeita moderada' }
    return { className: 'baixa', dot: '⚪', label: 'Suspeita baixa' }
  }

  function atualizar() {
    renderProgresso()
    renderRanking()
    renderExames()
    renderSindromesExplicadas()
  }

  function reset() {
    for (const k of Object.keys(answers)) delete answers[k]
    for (let i = 0; i < scores.length; i++) scores[i] = 0
    curSec = 0
    resultadoAberto = false
    atualizar()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;')
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
