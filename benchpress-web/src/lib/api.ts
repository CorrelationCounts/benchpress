import { BenchpressConfig } from '@/types/benchpress'

const API_BASE = '/api'

export async function fetchConfigs() {
  const response = await fetch(`${API_BASE}/config`)
  if (!response.ok) throw new Error('Failed to fetch configs')
  return response.json()
}

export async function fetchConfig(id: string) {
  const response = await fetch(`${API_BASE}/config/${id}`)
  if (!response.ok) throw new Error('Failed to fetch config')
  return response.json()
}

export async function saveConfig(config: BenchpressConfig) {
  const response = await fetch(`${API_BASE}/config`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config)
  })
  if (!response.ok) throw new Error('Failed to save config')
  return response.json()
}

export async function fetchRuns() {
  const response = await fetch(`${API_BASE}/runs`)
  if (!response.ok) throw new Error('Failed to fetch runs')
  return response.json()
}

export async function fetchRun(id: string) {
  const response = await fetch(`${API_BASE}/runs/${id}`)
  if (!response.ok) throw new Error('Failed to fetch run')
  return response.json()
}

export async function startRun(configId: string, configPath: string) {
  const response = await fetch(`${API_BASE}/runs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ configId, configPath })
  })
  if (!response.ok) throw new Error('Failed to start run')
  return response.json()
}

export async function stopRun(id: string) {
  const response = await fetch(`${API_BASE}/runs/${id}`, {
    method: 'DELETE'
  })
  if (!response.ok) throw new Error('Failed to stop run')
  return response.json()
}

