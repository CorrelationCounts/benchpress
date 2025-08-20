import { NextRequest, NextResponse } from 'next/server'
import { writeFileSync, readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { BenchpressConfig } from '@/types/benchpress'

const CONFIG_DIR = join(process.cwd(), '../../config')

export async function GET() {
  try {
    // Return list of available configs
    const configs = [
      { id: 'config', name: 'Default Config', path: 'config.json' },
      { id: 'minimal', name: 'Minimal Config', path: 'minimal.json' },
      { id: 'tetrad', name: 'Tetrad Suite', path: 'tetrad.json' },
      { id: 'gcastle', name: 'GCastle Algorithms', path: 'gcastle.json' },
    ]
    
    return NextResponse.json({ configs })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch configs' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const config: BenchpressConfig = await request.json()
    const configName = config.benchmark_setup[0]?.title || 'untitled'
    const filename = `${configName.replace(/[^a-zA-Z0-9]/g, '_')}.json`
    const filepath = join(CONFIG_DIR, filename)
    
    writeFileSync(filepath, JSON.stringify(config, null, 2))
    
    return NextResponse.json({ 
      message: 'Config saved successfully', 
      filename,
      path: filepath 
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save config' }, { status: 500 })
  }
}

