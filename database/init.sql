-- CRSET Solutions - Database Initialization Script
-- PostgreSQL database setup for local development

-- Create database if not exists (handled by Docker)
-- CREATE DATABASE IF NOT EXISTS crset_db;

-- Use the database
\c crset_db;

-- Create extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'new',
    source VARCHAR(100) DEFAULT 'website'
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2),
    currency VARCHAR(3) DEFAULT 'EUR',
    mascot VARCHAR(50),
    popular BOOLEAN DEFAULT FALSE,
    features JSONB,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create quotes/orders table
CREATE TABLE IF NOT EXISTS quotes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contact_id UUID REFERENCES contacts(id),
    service_id INTEGER REFERENCES services(id),
    status VARCHAR(50) DEFAULT 'pending',
    total_amount DECIMAL(10,2),
    currency VARCHAR(3) DEFAULT 'EUR',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial services data
INSERT INTO services (name, description, price, currency, mascot, popular, features) VALUES
('Desenvolvimento Web', 'Websites profissionais e responsivos', 599.00, 'EUR', 'laya', FALSE, 
 '["Design responsivo", "SEO otimizado", "Integração CMS", "Suporte 6 meses"]'),
 
('Aplicações Mobile', 'Apps iOS e Android nativas', 799.00, 'EUR', 'irina', FALSE,
 '["iOS & Android", "UI/UX profissional", "API integrada", "Publicação stores"]'),
 
('Automação de Processos', 'Automatize tarefas e aumente produtividade', 999.00, 'EUR', 'boris', TRUE,
 '["Workflows automáticos", "Integração sistemas", "Dashboards", "ROI garantido"]'),
 
('E-commerce', 'Lojas online completas e otimizadas', 1299.00, 'EUR', 'laya', FALSE,
 '["Pagamentos seguros", "Gestão stock", "Analytics", "Marketing integrado"]'),
 
('Soluções Cloud', 'Infraestrutura escalável na nuvem', 899.00, 'EUR', 'boris', FALSE,
 '["AWS/Azure", "Backup automático", "Monitorização", "Escalabilidade"]'),
 
('Consultoria Tech', 'Estratégia digital personalizada', 1499.00, 'EUR', 'irina', FALSE,
 '["Auditoria completa", "Roadmap estratégico", "Implementação", "Suporte contínuo"]')
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(active);
CREATE INDEX IF NOT EXISTS idx_services_popular ON services(popular);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON quotes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO crset_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO crset_user;

-- Display initialization success
SELECT 'CRSET Solutions database initialized successfully!' as message;

