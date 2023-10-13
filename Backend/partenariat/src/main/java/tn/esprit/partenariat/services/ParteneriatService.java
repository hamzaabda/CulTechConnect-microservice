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
    public Parteneriat updateParteneriat(Long idParteneriat, Parteneriat p) {
        Parteneriat existingParteneriat = pr.findById(idParteneriat).orElse(null);

        if (existingParteneriat != null) {
            if (p.getNomParteneriat() != null) {
                existingParteneriat.setNomParteneriat(p.getNomParteneriat());
            }
            if (p.getDescription() != null) {
                existingParteneriat.setDescription(p.getDescription());
            }
            if (p.getEmail() != null) {
                existingParteneriat.setEmail(p.getEmail());
            }
            if (p.getNumeroTelephone() != null) {
                existingParteneriat.setNumeroTelephone(p.getNumeroTelephone());
            }

            return pr.save(existingParteneriat);
        } else {
            throw new ParteneriatNotFoundException("Parteneriat not found with ID: " + idParteneriat);
        }
    }


    @Override
    public void deleteParteneriat(Long id) {
        pr.deleteById(id);
    }
}
