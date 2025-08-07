#!/usr/bin/env python3
"""
CRSET Solutions - Local Backend Flask
Backup backend for development and testing
"""

import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

# Initialize Flask app
app = Flask(__name__)

# Configure CORS for frontend integration
CORS(app, origins=[
    "http://localhost:3000",
    "https://crsetsolutions.com",
    "https://crset-fullstack-final.vercel.app"
])

# Health check endpoint
@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint for Docker"""
    return jsonify({
        'status': 'ok',
        'service': 'CRSET Solutions Backend',
        'version': '1.0.0',
        'timestamp': datetime.now().isoformat(),
        'environment': os.getenv('FLASK_ENV', 'development')
    }), 200

# Contact form endpoint
@app.route('/api/contact', methods=['POST'])
def contact():
    """Handle contact form submissions"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'message': 'No data provided'
            }), 400
        
        # Validate required fields
        required_fields = ['name', 'email', 'message']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    'success': False,
                    'message': f'Field {field} is required'
                }), 400
        
        # Log the contact form submission
        print(f"Contact form submission: {json.dumps(data, indent=2)}")
        
        # In a real implementation, you would:
        # 1. Save to database
        # 2. Send email via Resend/SendGrid
        # 3. Send notification to team
        
        return jsonify({
            'success': True,
            'message': 'Mensagem recebida! Entraremos em contacto em breve.'
        }), 200
        
    except Exception as e:
        print(f"Error in contact endpoint: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Erro interno do servidor'
        }), 500

# Services endpoint
@app.route('/api/services', methods=['GET'])
def services():
    """Get available services"""
    services_data = [
        {
            'id': 1,
            'name': 'Desenvolvimento Web',
            'description': 'Websites profissionais e responsivos',
            'price': 599,
            'currency': 'EUR',
            'mascot': 'laya',
            'features': [
                'Design responsivo',
                'SEO otimizado',
                'Integração CMS',
                'Suporte 6 meses'
            ]
        },
        {
            'id': 2,
            'name': 'Aplicações Mobile',
            'description': 'Apps iOS e Android nativas',
            'price': 799,
            'currency': 'EUR',
            'mascot': 'irina',
            'features': [
                'iOS & Android',
                'UI/UX profissional',
                'API integrada',
                'Publicação stores'
            ]
        },
        {
            'id': 3,
            'name': 'Automação de Processos',
            'description': 'Automatize tarefas e aumente produtividade',
            'price': 999,
            'currency': 'EUR',
            'mascot': 'boris',
            'popular': True,
            'features': [
                'Workflows automáticos',
                'Integração sistemas',
                'Dashboards',
                'ROI garantido'
            ]
        },
        {
            'id': 4,
            'name': 'E-commerce',
            'description': 'Lojas online completas e otimizadas',
            'price': 1299,
            'currency': 'EUR',
            'mascot': 'laya',
            'features': [
                'Pagamentos seguros',
                'Gestão stock',
                'Analytics',
                'Marketing integrado'
            ]
        },
        {
            'id': 5,
            'name': 'Soluções Cloud',
            'description': 'Infraestrutura escalável na nuvem',
            'price': 899,
            'currency': 'EUR',
            'mascot': 'boris',
            'features': [
                'AWS/Azure',
                'Backup automático',
                'Monitorização',
                'Escalabilidade'
            ]
        },
        {
            'id': 6,
            'name': 'Consultoria Tech',
            'description': 'Estratégia digital personalizada',
            'price': 1499,
            'currency': 'EUR',
            'mascot': 'irina',
            'features': [
                'Auditoria completa',
                'Roadmap estratégico',
                'Implementação',
                'Suporte contínuo'
            ]
        }
    ]
    
    return jsonify({
        'success': True,
        'services': services_data,
        'total': len(services_data)
    }), 200

# Root endpoint
@app.route('/', methods=['GET'])
def root():
    """Root endpoint"""
    return jsonify({
        'service': 'CRSET Solutions Backend',
        'version': '1.0.0',
        'status': 'running',
        'endpoints': [
            '/health',
            '/api/contact',
            '/api/services'
        ]
    }), 200

if __name__ == '__main__':
    # Get configuration from environment
    host = os.getenv('HOST', '0.0.0.0')
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_ENV') == 'development'
    
    print(f"Starting CRSET Solutions Backend on {host}:{port}")
    print(f"Debug mode: {debug}")
    
    # Run the application
    app.run(
        host=host,
        port=port,
        debug=debug,
        threaded=True
    )

