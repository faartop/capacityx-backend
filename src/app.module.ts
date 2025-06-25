import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlocacaoModule } from './alocacao/alocacao.module';
import { ClienteModule } from './cliente/cliente.module';
import { CategoriaModule } from './categoria/categoria.module';
import { CategoriaPaiModule } from './categoriapai/categoriapai.module';
import { ContratoModule } from './contrato/contrato.module';
import { ItemProjetoCategoriaModule } from './itemprojetocategoria/itemprojetocategoria.module';
import { ProjetoModule } from './projeto/projeto.module';
import { ProjetoCategoriaModule } from './projetocategoria/projetocategoria.module';
import { TecnicoModule } from './tecnico/tecnico.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ContratoTrabalhoModule } from './contratotrabalho/contratotrabalho.module';
import { ParseISODatePipe } from './common/pipes/parse-iso-date.pipe';
import { ApontamentoModule } from './apontamento/apontamento.module';

@Module({
  imports: [
    AlocacaoModule,
    CategoriaModule,
    CategoriaPaiModule,
    ClienteModule,
    ItemProjetoCategoriaModule,
    ProjetoModule,
    ProjetoCategoriaModule,
    TecnicoModule,
    UsuarioModule,
    ContratoTrabalhoModule,
    ContratoModule,
    ApontamentoModule
  ],
  controllers: [ AppController ],
  providers: [ AppService, ParseISODatePipe ],
})
export class AppModule {}
