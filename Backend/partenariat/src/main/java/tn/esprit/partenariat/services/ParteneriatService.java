package tn.esprit.partenariat.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.partenariat.entities.Parteneriat;
import tn.esprit.partenariat.repositories.ParteneriatRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ParteneriatService implements ParteneriatServiceInterface {


    @Autowired
    ParteneriatRepository pr;


    @Override
    public List<Parteneriat> getAllParteneriat() {
        return pr.findAll();
    }

    @Override
    public Optional<Parteneriat> getParteneriatById(Long id) {
        return pr.findById(id);
    }

    @Override
    public Parteneriat createParteneriat(Parteneriat p) {
        return pr.save(p);
    }

    @Override
    public Parteneriat updateParteneriat(Long idParteneriat ,Parteneriat p ) {
        Parteneriat p1 =pr.findById(idParteneriat).orElse(null);
        assert p1 != null;
        p1.setNomParteneriat(p.getNomParteneriat());
        p1.setDescription(p.getDescription());
        p1.setEmail(p.getEmail());
        p1.setNumeroTelephone(p.getNumeroTelephone());
        return pr.save(p1);

    }

    @Override
    public void deleteParteneriat(Long id) {
        pr.deleteById(id);
    }
}
