/** Guardrail: impede import errado do DataStream sem .client */
module.exports = {
  root: true,
  extends: ["next", "next/core-web-vitals"],
  rules: {
    "no-restricted-imports": ["error", {
      paths: [
        { name: "@/components/ui/data-stream", message: 'Use "@/components/ui/data-stream.client"' }
      ]
    }]
  }
};
